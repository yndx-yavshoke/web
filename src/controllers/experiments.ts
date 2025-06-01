import Elysia from "elysia";
import { readFileSync } from "fs";
import { watch } from "fs/promises";
import { join } from "path";
import json from "../../experiments.json";

type ExperimentsType = typeof json;

let experimentsData: ExperimentsType = {
  flags: {
    age: {
      enabled: false,
      oldFrom: 18,
      youngFrom: 20,
    },
  },
};

const jsonPath = join(process.cwd(), "experiments.json");

try {
  experimentsData = JSON.parse(readFileSync(jsonPath, "utf-8"));
} catch (error) {
  console.error("Error reading experiments.json:", error);
}

const watcher = async () => {
  try {
    const watcher = watch(jsonPath);
    for await (const event of watcher) {
      if (event.eventType === "change") {
        try {
          experimentsData = JSON.parse(readFileSync(jsonPath, "utf-8"));
          console.log("Experiments data reloaded");
        } catch (error) {
          console.error("Error reloading experiments.json:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error watching experiments.json:", error);
  }
};

watcher();

export const experimentsController = new Elysia().get(
  "/experiments",
  () => experimentsData,
  {
    detail: {
      hide: true,
    },
  }
);
