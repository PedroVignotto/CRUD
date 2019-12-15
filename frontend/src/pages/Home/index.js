import React, { useState, useEffect, useMemo } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import api from '../../services/api';
import history from '../../services/history';

import { Title, Content, List } from './styles';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  async function loadDoctors() {
    const response = await api.get('doctors', {
      params: { q: search },
    });

    setDoctors(response.data);
  }

  useEffect(() => {
    loadDoctors();
  }, []); //eslint-disable-line

  const doctorSize = useMemo(() => doctors.length, [doctors]);

  function handleDelete(id) {
    try {
      Swal.fire({
        title: 'Você tem certeza?',
        text: 'Você não poderá desfazer isso!',
        showCancelButton: true,
        confirmButtonColor: '#42cb59',
        cancelButtonColor: '#de3b3b',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.value) {
          api.delete(`doctors/delete/${id}`);

          setDoctors(doctors.filter(doctor => doctor.id !== id));
          toast.success('Médico excluído com sucesso');
        }
      });
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Title>Gerenciamento de médicos</Title>
      <Content>
        <div>
          <input
            placeholder="Buscar médico"
            autoComplete="off"
            onKeyDown={e => e.key === 'Enter' && loadDoctors()}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="button" onClick={() => loadDoctors()}>
            <MdSearch size={32} color="#7159c1" />
          </button>
        </div>
        <button type="button">
          <MdAdd
            size={32}
            color="#7159c1"
            onClick={() => history.push('/register')}
          />
        </button>
      </Content>

      <List>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CRM</th>
            <th>Telefone</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Especialidades</th>
            <th>Ações</th>
          </tr>
        </thead>
        {doctorSize ? (
          doctors.map(doctor => (
            <tbody key={doctor.id}>
              <tr>
                <td>{doctor.name}</td>
                <td>{doctor.crm}</td>
                <td>{doctor.telephone}</td>
                <td>{doctor.city}</td>
                <td>{doctor.state}</td>
                <td>
                  {doctor.specialties.map(specialty => (
                    <div key={specialty.id}>
                      <span>{specialty.name}</span>
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => history.push(`/edit/${doctor.id}`)}
                  >
                    editar
                  </button>
                  <button type="button" onClick={() => handleDelete(doctor.id)}>
                    deletar
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td colSpan="7">
                <strong>Nenhum médico cadastrado</strong>
              </td>
            </tr>
          </tbody>
        )}
      </List>
    </>
  );
}
