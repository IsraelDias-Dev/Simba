// Simba

let balance = 0;
let repeat = true;
const statement: {
    operation: 'Depósito' | 'Saque',
    amount: number,
    balance: number
}[] = [];

const utilities = {
    cancel: function () {
        const response = confirm('Deseja realmente cancelar?');

        if (!response) return response;

        alert('Operação cancelada.');
        return response;
    },
    verify: function (value: string | any) {
        if (value === '') return alert('Informe pelo menos um caractere numérico.');
        else if (!(value > 0)) return alert('Digite um valor válido.');

        return true;
    }
}

const operations = {
    check: function () {
        alert('Saldo atual: R$ ' + balance);
    },
    deposit: function (): void {
        const amount = prompt('Depositar\n\nDigite o valor:');

        if (amount === null) {
            const result = utilities.cancel();

            if (!result) operations.deposit();

            return;
        }

        const parsed = utilities.verify(amount);

        if (!parsed) return operations.deposit();

        balance += +amount;
        operations.check();

        statement[statement.length] = {
            operation: 'Depósito',
            amount: +amount,
            balance
        };
    },
    cashout: function (): void {
        const amount = prompt('Sacar\n\nDigite o valor:');

        if (amount === null) {
            const result = utilities.cancel();

            if (!result) operations.cashout();

            return;
        }

        const parsed = utilities.verify(amount);

        if (!parsed) return operations.cashout();

        if (+amount > balance) {
            alert('Saldo insuficiente.');
            return operations.cashout();
        }

        balance -= +amount;
        operations.check();

        statement[statement.length] = {
            operation: 'Saque',
            amount: +amount,
            balance
        };
    },
    statement: function () {
        let message = 'Extrato\n\n';

        if (!statement.length) return alert(message += 'Nenhuma movimentação realizada.\n');

        for (let i = 0; i < statement.length; i++) {
            message += statement[i].operation + ': R$ ' + statement[i].amount + ' === Saldo: R$ ' + statement[i].balance + '\n';
        }

        alert(message);
    },
    exit: function () {
        const response = confirm('Deseja realmente sair?');

        if (!response) return;

        repeat = false;
        alert('Foi um prazer atendê-lo.');
    },
    invalid: function () {
        alert('Operação inválida.');
    }
};

function run() {
    const username = prompt('Digite seu nome:');

    if (username === null) {
        const response = utilities.cancel();

        if (!response) run();

        return;
    }

    const parseName = username ? username : 'usuário';

    alert('Olá, ' + parseName + '! Bem vindo ao Simba.');

    while (repeat) {
        const operation = prompt('Selecione uma operação:\n\n1. Consultar\n2. Depositar\n3. Sacar\n4. Extrato\n5. Sair');

        if (operation === null) {
            const response = utilities.cancel();

            if (!response) continue;

            return;
        }

        const parsed = utilities.verify(operation);

        if (!parsed) continue;

        switch (+operation) {
            case 1: operations.check(); break;
            case 2: operations.deposit(); break;
            case 3: operations.cashout(); break;
            case 4: operations.statement(); break;
            case 5: operations.exit(); break;
            default: operations.invalid();
        }
    }
}

run();
