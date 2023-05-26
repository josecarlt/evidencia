import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alerta } from '../functions';

const SCliente = () => {
  const url = 'https://37f44r2aqh.execute-api.us-east-1.amazonaws.com/clientes';
  const [clientes, setClientes] = useState([]);
  const [id,setId]= useState('');
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [phone,setPhone]= useState('');
  const [salary,setSalary]= useState('');
  const [age,setAge]= useState('');
  const [operation,setOperation]= useState('');
  const [title,setTitle]= useState('');

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    try {
      const response = await axios.get(url);
      setClientes(JSON.parse(response.data.body).Items);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (op,id,name,email,phone,salary,age) =>{
    setId('');
    setName('');
    setEmail('');
    setPhone('');
    setSalary('');
    setAge('');
    setOperation(op);
    if(op === 1){
      setTitle('Registrar Cliente');
    }
    else if(op === 2){
      setTitle('Editar Cliente');
      setId(id);
      setName(name);
      setEmail(email);
      setPhone(phone);
      setSalary(salary);
      setAge(age);
    }
    window.setTimeout(function(){
      document.getElementById('id').focus();
    }, 500);
  }

  const validar = () =>{
    var parametros;
    var metodo;
    if(name.trim() === ''){
      show_alerta('Escribe el nombre del cliente', 'warning');
    }else if(email.trim() === ''){
      show_alerta('Escribe el email del cliente', 'warning');
    }else if(phone.trim() === ''){
      show_alerta('Escribe el numero del cliente', 'warning');
    }else if(salary.trim() === ''){
      show_alerta('Escribe el salario del cliente', 'warning');
    }else if(age.trim() === ''){
      show_alerta('Escribe la edad del cliente', 'warning');
    }
    else{
      if(operation === 1){
        parametros= {id:id,name:name.trim(), email:email.trim(), phone:phone, salary:salary, age:age};
        metodo= 'POST';
        enviarS(metodo,parametros);
      }else{
        parametros= {id:id,name:name.trim(), email:email.trim(), phone:phone, salary:salary, age:age};
        metodo= 'PUT';
        
        }
    }
  }

  const enviarS = async (metodo, parametros) => {
    parametros.id = parseInt(parametros.id);// Conversión de id a número
    await axios({ method: metodo, url: url, data: parametros }).then(function (respuesta) {
        var tipo = respuesta.data[0];
        var msj = respuesta.data[1];
        show_alerta(msj, tipo);
        if (tipo === 'success') {
          document.getElementById('btnCerrar').click();
          getClientes();
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        console.log(error);
      });
  };
  


  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button onClick={()=> openModal(1)} className="btn btn-dark" data-bs-toggle="modal" data-bs-target='#modalClientes'>
                <i className="fa-solid fa-circle-plus"></i> Agregar Cliente
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NOMBRE</th>
                    <th>EMAIL</th>
                    <th>CELULAR</th>
                    <th>SUELDO</th>
                    <th>EDAD</th>
                    
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.name}</td>
                      <td>{cliente.email}</td>
                      <td>{cliente.phone}</td>
                      <td>S/.{cliente.salary}</td>
                      <td>{cliente.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id='modalClientes' className="modal fade" aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className='input-group mb-3'>
              <span className='input-group-text'><i className="fa-solid fa-barcode"></i></span>
              <input type='number' id='id' placeholder='Insertar ID' className='form-control' value={id} onChange={(e)=> setId(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name} onChange={(e)=> setName(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-sharp fa-solid fa-envelope'></i></span>
                <input type='text' id='email' className='form-control' placeholder='Correo' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-phone'></i></span>
                <input type='number' id='phone' className='form-control' placeholder='Telefono' value={phone} onChange={(e)=> setPhone(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                <input type='number' id='salary' className='form-control' placeholder='Sueldo' value={salary} onChange={(e)=> setSalary(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                <input type='number' id='age' className='form-control' placeholder='Edad' value={age} onChange={(e)=> setAge(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  <i className='fa-solid fa-floppy-disk'></i> Guardar
                </button>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SCliente;
