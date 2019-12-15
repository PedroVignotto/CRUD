import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '../../services/api';
import history from '../../services/history';

import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  crm: Yup.string(),
  telephone: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  specialties: Yup.array(),
});

export default function Edit({ match }) {
  const [listSpecialties, setListSpecialties] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [telephone, setTelephone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const { id } = match.params;

  useEffect(() => {
    async function loadSpecialties() {
      const response = await api.get('specialties');

      setListSpecialties(response.data);
    }

    async function loadDoctor() {
      const response = await api.get(`doctors/${id}`);

      setSpecialty(response.data.specialties);
      setName(response.data.name);
      setCrm(response.data.crm);
      setTelephone(response.data.telephone);
      setCity(response.data.city);
      setState(response.data.state);
    }

    loadDoctor();

    loadSpecialties();
  }, []); //eslint-disable-line

  async function handleSubmit(data) {
    try {
      const { specialties, ...rest } = data;

      if (specialties.length > 0 && specialties.length < 2) {
        toast.error('Mínimo duas funcionalidades');
        return;
      }

      if (specialties.length >= 2) {
        await api.put(`doctors/edit/${id}`, {
          ...rest,
          specialties,
        });

        toast.success('Médico atualizado com sucesso');
        history.goBack();
      } else {
        await api.put(`doctors/edit/${id}`, {
          ...rest,
        });

        toast.success('Médico atualizado com sucesso');
        history.goBack();
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <div>
        <button type="button" onClick={() => history.goBack()}>
          <MdArrowBack size={30} color="#7159c1" />
        </button>

        <h1>Atualização de médico</h1>
      </div>

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input
          label="Nome"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          label="CRM"
          name="crm"
          value={crm}
          onChange={e => setCrm(e.target.value)}
        />
        <Input
          label="Telefone"
          name="telephone"
          value={telephone}
          onChange={e => setTelephone(e.target.value)}
        />
        <Input
          label="Cidade"
          name="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <Input
          label="Estado"
          name="state"
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <Select
          multiple
          label="Especialidades"
          name="specialties"
          options={listSpecialties}
          value={specialty}
          getOptionLabel={s => s.name}
          getOptionValue={s => s.id}
          setChange={setSpecialty}
        />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
