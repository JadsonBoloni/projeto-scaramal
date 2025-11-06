// Simulação de banco de dados: array de objetos representando usuários
let users = [
    { id: 1, nome: 'João', idade: 30 },
    { id: 2, nome: 'Maria', idade: 25 }
];

// Colunas da tabela (inicialmente ID, Nome, Idade)
let columns = ['id', 'nome', 'idade'];

// Função para renderizar a tabela
function renderTable(data = users) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    data.forEach(user => {
        const row = document.createElement('tr');
        columns.forEach(col => {
            const cell = document.createElement('td');
            cell.textContent = user[col] || ''; // Se a coluna não existir, deixa vazio
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Inicializar a tabela
renderTable();

// INSERT: Adicionar um novo usuário
function insertUser() {
    const name = document.getElementById('insert-name').value;
    const age = parseInt(document.getElementById('insert-age').value);
    if (name && age) {
        const newId = users.length + 1;
        users.push({ id: newId, nome: name, idade: age });
        renderTable();
        alert(`Usuário "${name}" inserido com sucesso!`);
    } else {
        alert('Preencha nome e idade.');
    }
}

// ALTER: Adicionar uma nova coluna
function alterTable() {
    const newColumn = document.getElementById('alter-column').value;
    if (newColumn && !columns.includes(newColumn)) {
        columns.push(newColumn);
        // Adicionar a coluna vazia a todos os usuários existentes
        users.forEach(user => user[newColumn] = '');
        renderTable();
        alert(`Coluna "${newColumn}" adicionada!`);
    } else {
        alert('Nome da coluna inválido ou já existe.');
    }
}

// DELETE: Remover um usuário por ID
function deleteUser() {
    const id = parseInt(document.getElementById('delete-id').value);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        renderTable();
        alert(`Usuário com ID ${id} deletado!`);
    } else {
        alert('ID não encontrado.');
    }
}

// DROP: Deletar a tabela inteira
function dropTable() {
    users = [];
    columns = ['id', 'nome', 'idade']; // Resetar colunas
    renderTable();
    alert('Tabela deletada! (Recarregue a página para resetar.)');
}

// SELECT: Filtrar usuários por idade
function selectUsers() {
    const minAge = parseInt(document.getElementById('select-age').value);
    if (minAge) {
        const filtered = users.filter(user => user.idade > minAge);
        renderTable(filtered);
        alert(`${filtered.length} usuários encontrados com idade > ${minAge}.`);
    } else {
        renderTable(); // Mostrar todos se não filtrar
        alert('Mostrando todos os usuários.');
    }
}