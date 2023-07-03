export let config = {
    // HELP TEXT COMMANDS
    helpMessage: {
        help: '§b Comandos: \n\n §3 -  !setLenguaje  (Selecionar tu Lenguaje, usa " !help setLenguaje " para mas info)',
        setLenguaje: '§bUsa  !setLenguaje  + el Idioma, por ejemplo " !setLenguaje  ES". Esta es la lista de Lenguajes \n §gDE    Alemán \n EN    Inglés\n ES    Español\n FR    Francés\n IT    Italiano\n JA    Japonés\n NL    Holandés\n PL    Polaco \n PT    Portugués\n RU    Ruso\n ZH    Chino (simplificado)',

    },
    Messages: {
        invalidLang: '§cEl lenguaje solicitado no es valido',
        langChange: '§aLenguaje cambiado saticfactoriamente'
    },
    // HELP TEXT NAMES AND PREFIX
    prefixCommand: "!",
    helpCommand: "help",
    lenguajeCommand: "setLenguaje",
    // LENGUAJE
    Langs: ["DE", "EN", "ES", "FR", "IT", "JA", "NL", "PL", "PT", "RU", "ZH"],
    // Api key de deepL
    api_key:"123134234",
}