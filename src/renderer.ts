import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

const doc = new Y.Doc();
const map = doc.getMap();

const roomId = "tldraw-p2p-eval";
const provider = new WebrtcProvider(roomId, doc);

map.observe((ymapEvent) => {
  ymapEvent.changes.keys.forEach((change, key) => {
    if (change.action === "add") {
      console.log(
        `Property "${key}" was added. Initial value: "${map.get(key)}".`
      );
    } else if (change.action === "update") {
      console.log(
        `Property "${key}" was updated. New value: "${map.get(
          key
        )}". Previous value: "${change.oldValue}".`
      );
    } else if (change.action === "delete") {
      console.log(
        `Property "${key}" was deleted. New value: undefined. Previous value: "${change.oldValue}".`
      );
    }
  });
});

doc.transact(() => {
  map.set(process.env.PEER_ID, new Date().getTime());
}, process.env.PEER_ID);

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
