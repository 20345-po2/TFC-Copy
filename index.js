const express = require('express')
const app = express()
const df = require('dialogflow-fulfillment')
const {google} = require('googleapis')
const { response } = require('express')


//Especificar a porta 
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server ir running in port ${PORT}`)
})

//Nomes dos eventos do Dialogflow
const eventoExcessoAgua = 'alerta-excessoAgua'
const eventoConfortoHidrico = 'alerta-confortoHidrico'
const eventoRegar = 'alerta-regar'
const opcaoInvalida = 'input-invalido'

app.post('/webhook', express.json(), (request, response) => {
    const agent = new df.WebhookClient({
    request: request,
    response: response
});

function interpretValues(agent) {
   
    let humidadePercentual = agent.contexts[1].parameters.humidadePercentual
    let texturaSolo = agent.contexts[1].parameters.texturaSolo
    texturaSolo = texturaSolo.toLowerCase()
    
    if (humidadePercentual <= 5) {
        agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)        
        agent.setFollowupEvent(eventoRegar)
    } else if (humidadePercentual > 5 && humidadePercentual <= 10) {
        if (texturaSolo == "leve") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "média" || texturaSolo == "media" ||  texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        }
    } else if (humidadePercentual > 10 && humidadePercentual <= 15) {
        if (texturaSolo == "leve") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        }
    } else if (humidadePercentual > 15 && humidadePercentual <= 20) {
        if (texturaSolo == "leve") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (humidadePercentual > 20 && humidadePercentual <= 25) {
        if (texturaSolo == "leve") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (humidadePercentual > 25 && humidadePercentual <= 30) {
        if (texturaSolo == "leve" || texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (humidadePercentual > 30 && humidadePercentual <= 35) {
        if (texturaSolo == "leve" || texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (humidadePercentual > 40) {
        agent.add(`Com a humidade = ${humidadePercentual} e solo de textura ${texturaSolo}:`)
        agent.setFollowupEvent(eventoExcessoAgua)
    } else {
        agent.add("Verifique que forneceu os valores válidos, de acordo com as instruções apresentadas.")
        agent.setFollowupEvent(opcaoInvalida)
    } 
}

function interpretValuesPotencial(agent) {
     
    let tensao = agent.contexts[0].parameters.tensao
    let texturaSolo = agent.contexts[0].parameters.texturaSolo
    texturaSolo = texturaSolo.toLowerCase()

    if (tensao <= 5) {
        agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
        agent.setFollowupEvent(eventoExcessoAgua) 
    } else if (tensao > 5 && tensao <= 10) {
        if (texturaSolo == "leve") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "média" || texturaSolo == "media" ||  texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoExcessoAgua)
        }
    } else if (tensao > 10 && tensao <= 15) {
        if (texturaSolo == "leve") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (tensao > 15 && tensao <= 20) {
        if (texturaSolo == "leve") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (tensao > 20 && tensao <= 25) {
        if (texturaSolo == "leve") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        } else if (texturaSolo == "média" || texturaSolo == "media") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoRegar)
        } else if (texturaSolo == "pesado" ||  texturaSolo == "pesada") {
            agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
            agent.setFollowupEvent(eventoConfortoHidrico)
        }
    } else if (tensao > 25 && tensao >= 30) {
        agent.add(`Com a tensão = ${tensao} e solo de textura ${texturaSolo}:`)
        agent.setFollowupEvent(eventoRegar)
    } else {
        agent.add("Verifique que forneceu os valores válidos, de acordo com as instruções apresentadas.")
        agent.setFollowupEvent(opcaoInvalida)
    }
   

 }
 
let intentMap = new Map()
intentMap.set(`047_Sei_textura_solo_potencial`, interpretValuesPotencial)
intentMap.set(`036_00_Sei_a_Textura_do_solo`, interpretValues)
agent.handleRequest(intentMap);

})
