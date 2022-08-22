import iluminacaoService from "./iluminacaoService";
import pracaService from "./pracaService";
import pavimentacaoService from "./pavimentacaoService";
import fiscInstalacaoService from "./fiscInstalacaoService";
import monumentoChafarizService from "./monumentoChafarizService";
import viasPublicasService from "./viasPublicasService";
import limpezaTerrenoService from "./limpezaTerrenoService";
import limpezaPiscinaService from "./limpezaPiscinaService";
import radarDengueService from "./radarDengueService";
import focoEscorpiaoService from "./focoEscorpiaoService";
import leishmanioseService from "./leishmanioseService";
import insetosService from "./insetosService";
import animaisAbandonadosService from "./animaisAbandonadosService";
import animaisSinantropicosService from "./animaisSinantropicosService";
import animaisGrandesService from "./animaisGrandesService";
import animaisPerdidosService from "./animaisPerdidosService";
import adocaoAnimaisService from "./adocaoAnimaisService";
import mausTratosAnimaisService from "./mausTratosAnimaisService";
import adocaoAreasService from "./adocaoAreasService";
import locaisUteisService from "./locaisUteisService";
import telefonesUteisService from "./telefonesUteisService";
import tumulosService from "./tumulosService";
import parquesService from "./parquesService";
import ruriasService from "./ruraisService";
import ruraisService from "./ruraisService";
import ambientesService from "./ambientesService";
import programacaoService from "./programacaoService";
import gestoresService from "./gestoresService";
import propostasService from "./propostasService";
import anticorrupcaoService from "./anticorrupcaoService";
import noticiasService from "./noticiasService";
import sugestoesService from "./sugestoesService";
import ofertasService from "./ofertasService";
import animaisMortosService from "./animaisMortosService";
import remocaoLixoService from "./remocaoLixoService";
import feiraService from "./feiraService";
import descarteSolidarioService from "./descarteSolidarioService";
import arvoresService from "./arvoresService";
import diaristasService from "./diaristasService";
import violenciaDomesticaService from "./violenciaDomesticaService";
import familiasCarentesService from "./familiasCarentesService";
import roubosService from "./roubosService";
import animaisSelvagensService from "./animaisSelvagensService";
import moradoresRuaService from "./moradoresRuaService";


const typeService = (type) => {
    console.log(type);
    switch (type) {
        case "Iluminação pública":
            return iluminacaoService
        case "Pavimentação":
            return pavimentacaoService
        case "Fiscalização de Instalações":
            return fiscInstalacaoService
        case "Monumentos e Chafarizes":
            return monumentoChafarizService
        case "Vias Públicas":
            return viasPublicasService
        case "Pontes em Estradas Rurais":
            return ruraisService
        case "Parques":
            return parquesService
        case "Praças":
            return pracaService
        case "Resíduos Sólidos":
            return remocaoLixoService
        case "Animais Mortos":
            return animaisMortosService
        case "Limpeza de Terreno":
            return limpezaTerrenoService
        case "Limpeza de Piscina":
            return limpezaPiscinaService
        case "Restaurantes e Ambientes":
            return ambientesService
        case "Radar da Dengue":
            return radarDengueService
        case "Foco de Escorpião":
            return focoEscorpiaoService
        case "Leishmaniose":
            return leishmanioseService
        case "Insetos, roedores, etc...":
            return insetosService
        case "Animais abandonado":
            return animaisAbandonadosService
        case "Animais sinantrópicos":
            return animaisSinantropicosService
        case "Captura de animais de grande porte":
            return animaisGrandesService //////
        case "Animais Perdidos":
            return animaisPerdidosService
        case "Adoção de animais":
            return adocaoAnimaisService
        case "Denúncia de maus tratos de animais":
            return mausTratosAnimaisService
        case "Adoção de Áreas públicas":
            return adocaoAreasService
        case "Indicadores de poluição":
            return
        case "Coleta de Lixo / Coleta seletiva":
            return
        case "Animais Silvestres":
            return animaisSelvagensService
        case "Danos à Fauna":
            return
        case "Cadastro de árvores":
            return arvoresService
        case "Locais úteis ao cidadão":
            return locaisUteisService
        case "Telefones Úteis":
            return telefonesUteisService
        case "Programação Cultural":
            return programacaoService
        case "Túmulos de falecidos":
            return tumulosService
        case "Feiras Livres":
            return feiraService
        case "Cadastro de Diaristas":
            return diaristasService
        case "Moradores de Rua":
            return moradoresRuaService
        case "Cadastro":
            return familiasCarentesService
        case "Descarte Solidário":
            return descarteSolidarioService
        case "Denúncia de violência doméstica":
            return violenciaDomesticaService
        case "Ocorrência de Acidentes":
            return
        case "Ocorrência de Furtos/Roubos":
            return roubosService
        case "Mulheres":
            return
        case "Idosos":
            return
        case "Conheça os Gestores":
            return gestoresService
        case "Consultar Propostas":
            return propostasService
        case "Central Anticorrupção":
            return anticorrupcaoService
        case "Notícias":
            return noticiasService
        case "Sugestões":
            return sugestoesService
        case "Rotas dos guardas":
            return
        case "Trânsito":
            return
        case "Rota de Veículos":
            return
        case "Cartão fidelidade":
            return
        case "Ofertas Locais":
            return ofertasService


    }
}

export { typeService } 