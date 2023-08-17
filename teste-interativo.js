const readline = require('readline');

class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    ];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async calcularValorInterativo() {
    this.rl.question('Digite a forma de pagamento (debito, credito, dinheiro): ', async (formaDePagamento) => {
      this.rl.question('Digite os itens separados por vírgula (ex: cafe,1,suco,2): ', async (itensInput) => {
        const itens = itensInput.split(',');

        const valorTotal = this.calcularValorDaCompra(formaDePagamento, itens);
        console.log(`Valor total da compra: ${valorTotal}`);

        this.rl.close();
      });
    });
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    let valorTotal = 0;
    for (let i = 0; i < itens.length; i += 2) {
      const codigo = itens[i];
      const quantidade = parseInt(itens[i + 1]);

      if (!this.verificarItemExistente(codigo)) {
        return "Item inválido!";
      }

      const item = this.cardapio.find(item => item.codigo === codigo);
      const valorItem = item.valor * quantidade;

      if (codigo !== 'chantily' && !this.verificarItemPrincipal(codigo)) {
        return "Item extra não pode ser pedido sem o principal";
      }

      valorTotal += valorItem;
    }

    if (formaDePagamento === 'dinheiro') {
      valorTotal *= 0.95;
    } else if (formaDePagamento === 'credito') {
      valorTotal *= 1.03;
    } else if (formaDePagamento !== 'debito') {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }

  verificarItemExistente(codigo) {
    return this.cardapio.some(item => item.codigo === codigo);
  }

  verificarItemPrincipal(codigo) {
    return ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2'].includes(codigo);
  }
}

const caixa = new CaixaDaLanchonete();
caixa.calcularValorInterativo();
