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
  name: Yup.string().required('Campo obrigatório'),
  crm: Yup.string().required('Campo obrigatório'),
  telephone: Yup.string().required('Campo obrigatório'),
  city: Yup.string().required('Campo obrigatório'),
  state: Yup.string().required('Campo obrigatório'),
  specialties: Yup.array()
    .required('Campo obrigatório')
    .min(2, 'Mínimo duas especialidades'),
});

export default function Register() {
  const [specialties, setSpecialties] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function loadSpecialties() {
      const response = await api.get('specialties');

      setSpecialties(response.data);
    }

    loadSpecialties();
  }, []);

  async function handleSubmit(data) {
    try {
      await api.post('doctors/new', data);

      toast.success('Médico cadastrado com sucesso');
      history.goBack();
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

        <h1>Cadastro de médico</h1>
      </div>

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input label="Nome" name="name" />
        <Input label="CRM" name="crm" />
        <Input label="Telefone" name="telephone" />
        <Input label="Cidade" name="city" />
        <Input label="Estado" name="state" />
        <Select
          multiple
          label="Especialidades"
          name="specialties"
          options={specialties}
          value={options}
          getOptionLabel={specialty => specialty.name}
          getOptionValue={specialty => specialty.id}
          setChange={setOptions}
        />
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
