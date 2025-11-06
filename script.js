// Simulação de banco de dados: array de objetos representando usuários
let users = [
    { id: 1, nome: 'João', idade: 30 },
    { id: 2, nome: 'Maria', idade: 25 }
];

// Colunas da tabela (inicialmente ID, Nome, Idade)
let columns = ['id', 'nome', 'idade'];

// NOVO: Função para salvar dados no localStorage
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('columns', JSON.stringify(columns));
}

// NOVO: Função para carregar dados do localStorage
function loadData() {
    const savedUsers = localStorage.getItem('users');
    const savedColumns = localStorage.getItem('columns');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
    if (savedColumns) {
        columns = JSON.parse(savedColumns);
    }
}

// NOVO: Carregar dados ao inicializar (chamado no final do script)
loadData();

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
        saveData(); // NOVO: Salvar após inserção
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
        saveData(); // NOVO: Salvar após alteração da tabela
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
        saveData(); // NOVO: Salvar após exclusão
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
    saveData(); // NOVO: Salvar após drop (mesmo que vazio)
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
    // NOVO: Não salvamos aqui, pois SELECT não altera dados, apenas filtra para exibição
}