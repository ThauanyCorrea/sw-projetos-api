const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getProjetos = (request, response) => {
    pool.query('SELECT * FROM projetos', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

const addProjeto = (request, response) => {
    const { nome, cidade, email } = request.body

    pool.query(
        'INSERT INTO projetos (nome, cidade, email) VALUES ($1, $2, $3)',
        [nome, cidade, email],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Projeto criado.' })
        },
    )
}

const updateProjeto = (request, response) => {
    const { codigo, nome, cidade, email } = request.body
    pool.query('UPDATE projetos set nome=$1, cidade=$2, email=$3 where codigo=$4',
        [nome, cidade, email, codigo], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Projeto atualizado.' })
        })
}

const deleteProjeto = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM projetos where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(201).json({ status: 'success', message: 'Projeto apagado.' })
    })
}

const getProjetoPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM projetos where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/projetos')
    // GET endpoint
    .get(getProjetos)
    // POST endpoint
    .post(addProjeto)
    // PUT
    .put(updateProjeto)

app.route('/projetos/:id')
    .get(getProjetoPorID)
    .delete(deleteProjeto)


// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})