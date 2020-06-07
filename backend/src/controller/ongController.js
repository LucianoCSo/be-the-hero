const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    },

    async creaate(req, res) {
        const { nome, email, whatsapp, cidade, uf } = req.body
        const id = crypto.randomBytes(4).toString('HEX')
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf
        })
        return res.json({ id })
    },

    // async delete(req, res) {
    //     const { id } = req.params
    //     const idOng = res.headers.altorizacao

    //     const ongs = await connection('ongs')
    //         .where('id', id)
    //         .select('id')
    //         .first()

    //     if (ongs.id !== idOng) {
    //         return res.status(401)
    //             .json({ error: "Operação não permitida." })
    //     }

    //     await connection('ongs').where('id', id).delete()
    //     return res.status(204).send()
    // }
}