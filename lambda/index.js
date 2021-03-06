/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const URI_API_CARTOLA = 'https://api.cartolafc.globo.com';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Olá, seja bem vindo ao seu assistente do Cartola FC.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const  GetTesteHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetTeste';
    },
    handle(handlerInput) {
 
      
        const axios = require('axios');
 
        return axios.get(`https://api.cartolafc.globo.com/mercado/status`)
            .then(response => {
                const price = response.data.rodada_atual;
 
                const speakOutput = ` a rodada atual é ${price}`;
 
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(err => {
                const speakOutput = `Houve um erro: ${err.message}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
    }
};

const  QuantidadeDeTimesEscaladosHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TIMESESCALADOS';
    },
    handle(handlerInput) {
 
      
        const uri_mercado_status = URI_API_CARTOLA + '/mercado/status';
        const axios = require('axios');
 
        return axios.get(uri_mercado_status)
            .then(response => {
                const times_escalados = response.data.times_escalados;
                const speakOutput = `A quantidade de times escalados na rodada atual é de ${times_escalados}`;
 
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(err => {
                const speakOutput = `Houve um erro: ${err.message}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
    }
};

/**
    Informações desejada: Nome do mito da rodada, time do mito da rodada
 * */
const  MitoDaRodadaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MitoDaRodada';
    },
    handle(handlerInput) {
 
      
        const axios = require('axios');
 
        return axios.get(`https://api.cartolafc.globo.com/pos-rodada/destaques`)
            .then(response => {

                const nome_mito_rodada = response.data.mito_rodada.nome_cartola;
 
                const speakOutput = `o mito da rodada do cartola fc foi o cartoleiro ${nome_mito_rodada}`;
 
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(err => {
                const speakOutput = `Houve um erro: ${err.message}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
    }
};


const  FechamentoDoMercadoHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FechamentoDoMercado';
    },
    handle(handlerInput) {
 
      
        const axios = require('axios');
 
        return axios.get(`https://api.cartola.globo.com/mercado/status`)
            .then(response => {
                const dia = response.data.fechamento.dia;
                const mes = response.data.fechamento.mes;
                const ano = response.data.fechamento.ano;
                const minuto = response.data.fechamento.ano;
                const hora = response.data.fechamento.ano;

                const data = Date.parse(dia +"/"+ mes+ "/"+ano);
                const horario = "às " + hora + "e " +minuto + "minutos";

                const speakOutput = `O mercado fecherá ${data} às` + horario;
 
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(err => {
                const speakOutput = `Houve um erro: ${err.message}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
    }
};


/**
    Informações desejada: Jogador mais escalados
 * */

const  JogadorMaisEscaladoRodadaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MaisEscalado';
    },
    handle(handlerInput) {
 
      
        const uri_mercado_destaques = URI_API_CARTOLA + '/mercado/destaques';
        const axios = require('axios');
 
        return axios.get(uri_mercado_destaques)
            .then(response => {

                const jogador_mais_escalado = response.data[0].Atleta.apelido;
                const quantidade_escalacoes = response.data[0].escalacoes;

                const speakOutput = `O jogador mais escalado na rodada foi o ${jogador_mais_escalado} com ${quantidade_escalacoes} escalações`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
            .catch(err => {
                const speakOutput = `Houve um erro: ${err.message}`;
                return handlerInput.responseBuilder
                    .speak(speakOutput)
                    .getResponse();
            })
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        GetTesteHandler,
        QuantidadeDeTimesEscaladosHandler,
        FechamentoDoMercadoHandler,
        MitoDaRodadaHandler,
        JogadorMaisEscaladoRodadaHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();