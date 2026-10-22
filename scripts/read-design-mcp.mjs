import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const root = process.env.PATH.split(path.delimiter).map(entry => path.resolve(entry, "..", "@magicuidesign/mcp")).find(entry => fs.existsSync(path.join(entry,"package.json")));
if (!root) throw new Error("Run with npm exec --package=@magicuidesign/mcp@2.0.0 -- node scripts/read-design-mcp.mjs");
const require = createRequire(path.join(root,"package.json"));
const { Client } = await import(pathToFileURL(require.resolve("@modelcontextprotocol/sdk/client/index.js")).href);
const { StdioClientTransport } = await import(pathToFileURL(require.resolve("@modelcontextprotocol/sdk/client/stdio.js")).href);
const pkg = JSON.parse(fs.readFileSync(path.join(root,"package.json"),"utf8"));
const binary = typeof pkg.bin === "string" ? pkg.bin : Object.values(pkg.bin)[0];
const client = new Client({name:"portfolio-design-reference",version:"1.0.0"});
await client.connect(new StdioClientTransport({command:process.execPath,args:[path.join(root,binary)]}));
try {
  const list = await client.listTools();
  fs.mkdirSync("docs/research",{recursive:true});
  fs.writeFileSync("docs/research/magicui-tools.json",JSON.stringify(list,null,2));
  console.log(JSON.stringify(list.tools.map(tool=>({name:tool.name,description:tool.description?.slice(0,140),schema:tool.inputSchema})),null,2));
  for(const name of process.argv.slice(2)) {
    const result=await client.callTool({name:"getRegistryItem",arguments:{name,includeSource:true,includeExamples:false,includeRelated:false}});
    fs.writeFileSync(`docs/research/magicui-${name.replace(/[^a-z0-9-]/gi,"-")}.json`,JSON.stringify(result,null,2));
    console.log(`${name}: saved`);
  }
} finally { await client.close(); }
