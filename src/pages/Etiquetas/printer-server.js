import net from "net";
import express from "express";

const app = express();
app.use(express.text({ type: "*/*" }));

app.post("/print", (req, res) => {
  const client = new net.Socket();

  client.connect(9100, "127.0.0.1", () => {
    client.write(req.body);
    client.end();
  });

  client.on("error", err => {
    console.error(err);
  });

  res.send("OK");
});

app.listen(9100, () =>
  console.log("🖨 Serviço Zebra ativo")
);
