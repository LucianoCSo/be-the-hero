const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query

        const [contador] = await connection('incidents').count()

        const incidentes = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.cidade',
                'ongs.uf'
            ])

        res.header('X-Total-Count', contador['count(*)'])
        return res.json({ incidentes })
    },

    async create(req, res) {
        const { titulo, descricao, valor } = req.body
        const ong_id = req.headers.altorizacao

        const [id] = await connection('incidents').insert({
            titulo,
            descricao,
            valor,
            ong_id
        })
        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.altorizacao
        const incidente = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incidente.ong_id !== ong_id) {
            return res.status(401)
                .json({ error: "Operação não permitida." })
        }

        await connection('incidents').where('id', id).delete()
        return res.status(204).send()
    },

    async editar(req, res) {
        const { titulo, descricao, valor } = req.body
        const { id } = req.params
        const ong_id = req.headers.altorizacao
        const incidente = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incidente.ong_id !== ong_id) {
            return res.status(401)
                .json({ error: "Operaçãonão permitida." });
        }

        await connection('incidents').update({
            titulo,
            descricao,
            valor
        })

        const retorno = await connection('incidents').where('id', id).select('*')

        return res.json(retorno)
    }
}