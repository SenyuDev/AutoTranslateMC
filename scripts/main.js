// @ts-ignore
import { world, system } from "@minecraft/server";

import { http } from "@minecraft/server-net";
import { config } from "./config"


world.beforeEvents.chatSend.subscribe(async (eventData) => {
  eventData.cancel = true;
  const player = eventData.sender
  const playerName = eventData.sender.name
  const message = eventData.message;
  const playerLang =
    eventData.sender
      .getTags()
      .find((element) => element.startsWith("lang:"))
      ?.replace("lang:", "") ?? "EN";
  let players = world.getAllPlayers();
//   world.sendMessage(eventData.sender.name)
  
  if (message.startsWith(config.prefixCommand)) {
    const [prefix, command] = message.replace(config.prefixCommand, "").split(" ")
    console.warn(`${prefix} + ${command}`)
    if ( (prefix == config.helpCommand) && (command == config.lenguajeCommand)) {
        player.sendMessage(config.helpMessage.setLenguaje)
    } else if ((prefix == config.lenguajeCommand) && (command)) {
        if (!config.Langs.includes(command.toUpperCase())) return player.sendMessage(config.Messages.invalidLang);
        let langplayer = player.getTags().filter((str) => str.startsWith("lang:"))
        if (langplayer.length < 1) {
            await sleep(10);
            player.addTag(`lang:${command.toUpperCase()}`)
            player.sendMessage(config.Messages.langChange)
        } else {
            await sleep(10);
            for (let lang of langplayer) {
                player.removeTag(lang)
            }
            player.addTag(`lang:${command.toUpperCase()}`)
            player.sendMessage(config.Messages.langChange)
        }
    } else {
        player.sendMessage(config.helpMessage.help)
    }
  } else {
    await sleep(10);
    for (let player of players) {
      let tag = player.getTags()?.find((element) => element.startsWith("lang:")) ?? "EN";
      if (tag) {
        let lang = tag.replace("lang:", "");
        player.sendMessage(
          await getMessage(playerLang, lang, message, playerName)
        );
      }
    }
  }
});

async function getMessage(langIn, langOut, message, playername) {
  const request = await http
    .get(
      `https://api-free.deepl.com/v2/translate?auth_key=${config.api_key}&text=${encodeURIComponent(
        message
      )}&target_lang=${langOut}&source_lang=${langIn}`
    )
    .catch((e) => {
      world.sendMessage(e + "");
    });
  const body = request.body;
  return `<${playername}> [§3${langIn}§r] ${
    JSON.parse(body).translations[0].text 
  }`;
}

async function traducir(langOut, message) {
  const request = await http
    .get(
      `https://api-free.deepl.com/v2/translate?auth_key=${config.api_key}&text=${encodeURIComponent(
        message
      )}&target_lang=${langOut}`
    )
    .catch((e) => {
      world.sendMessage(e + "");
    });

  const body = request.body;
  return `${JSON.parse(body).translations[0].text }`;
}

export function sleep(tick) {
    return new Promise((resolve) => {
      const id = system.runInterval(() => {
        resolve();
        system.clearRun(id);
      }, tick);
    });
  }

  system.events.beforeWatchdogTerminate.subscribe((event) => {
    event.cancel = true;
    console.warn(`[Watchdog] Canceled critical exception of type '${event.cancelationReason}`);
  });