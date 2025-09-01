"use client";

import { useState } from "react";

interface Item {
  nome: string;
  quantidade: number;
  data: string;
  observacoes: string;
}

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>({
    nome: "",
    quantidade: 0,
    data: "",
    observacoes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, form]);
    setForm({ nome: "", quantidade: 0, data: "", observacoes: "" });
  };

  const updateItem = (index: number, key: keyof Item, value: string) => {
    const newItems = [...items];
    if (key === "quantidade") newItems[index][key] = Number(value);
    else newItems[index][key] = value;
    setItems(newItems);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Oeste Laser - Planilha</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          name="nome"
          placeholder="Nome da peça"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          name="quantidade"
          type="number"
          placeholder="Quantidade"
          value={form.quantidade}
          onChange={handleChange}
        />
        <input
          name="data"
          type="date"
          placeholder="Data"
          value={form.data}
          onChange={handleChange}
        />
        <input
          name="observacoes"
          placeholder="Observações"
          value={form.observacoes}
          onChange={handleChange}
        />
        <button onClick={addItem}>Adicionar</button>
      </div>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Nome da peça</th>
            <th>Quantidade</th>
            <th>Data</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  value={item.nome}
                  onChange={(e) => updateItem(i, "nome", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantidade}
                  onChange={(e) => updateItem(i, "quantidade", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={item.data}
                  onChange={(e) => updateItem(i, "data", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={item.observacoes}
                  onChange={(e) => updateItem(i, "observacoes", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}