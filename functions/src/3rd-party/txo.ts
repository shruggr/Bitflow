// This is 3rd party functionality extracted from unwriter's TXO package
// The TXO package conflicted with the BSV library
// I just pulled what I needed until I can resolve the dependency conflicts

const bsv = require('bsv');

export function fromTx(transaction: string, options?: any): any {
  return new Promise(function(resolve, reject) {
    let gene = new bsv.Transaction(transaction);
    let t = gene.toObject()
    let inputs: any[] = [];
    let outputs: any[] = [];
    if (gene.inputs) {
      gene.inputs.forEach(function(input: any, input_index: number) {
        if (input.script) {
          let xput: any = { i: input_index }
          input.script.chunks.forEach(function(c: any, chunk_index: number) {
            if (c.buf) {
              if (c.buf.byteLength >= 512) {
                xput["lb" + chunk_index] = c.buf.toString('base64')
              } else {
                xput["b" + chunk_index] = c.buf.toString('base64')
              }
              if (options && options.h && options.h > 0) {
                xput["h" + chunk_index] = c.buf.toString('hex')
              }
            } else {
              if (typeof c.opcodenum !== 'undefined') {
                xput["b" + chunk_index] = {
                  op: c.opcodenum
                }
              } else {
                xput["b" + chunk_index] = c;
              }
            }
          })
          xput.str = input.script.toASM()
          let sender: any = {
            h: input.prevTxId.toString('hex'),
            i: input.outputIndex
          }
          let address = input.script.toAddress(bsv.Networks.livenet).toString()
          if (address && address.length > 0) {
            sender.a = address;
          }
          xput.e = sender;
          inputs.push(xput)
        }
      })
    }
    if (gene.outputs) {
      gene.outputs.forEach(function(output: any, output_index: number) {
        if (output.script) {
          let xput: any = { i: output_index }
          output.script.chunks.forEach(function(c: any, chunk_index: number) {
            if (c.buf) {
              if (c.buf.byteLength >= 512) {
                xput["lb" + chunk_index] = c.buf.toString('base64')
                xput["ls" + chunk_index] = c.buf.toString('utf8')
              } else {
                xput["b" + chunk_index] = c.buf.toString('base64')
                xput["s" + chunk_index] = c.buf.toString('utf8')
              }
              if (options && options.h && options.h > 0) {
                xput["h" + chunk_index] = c.buf.toString('hex')
              }
            } else {
              if (typeof c.opcodenum !== 'undefined') {
                xput["b" + chunk_index] = {
                  op: c.opcodenum
                }
              } else {
                xput["b" + chunk_index] = c;
              }
            }
          })
          xput.str = output.script.toASM()
          let receiver: any = {
            v: output.satoshis,
            i: output_index
          }
          let address = output.script.toAddress(bsv.Networks.livenet).toString()
          if (address && address.length > 0) {
            receiver.a = address;
          }
          xput.e = receiver;
          outputs.push(xput)
        }
      })
    }
    let r: any = {
      tx: { h: t.hash },
      in: inputs,
      out: outputs
    }
    // confirmations
    if (options && options.confirmations) {
      r.confirmations = options.confirmations
    }
    resolve(r)
  })
}