import gitLogo from '../assets/github.png';
import { Container } from './styles';
import Button from '../Components/Button';
import ItemRepo from '../Components/ItemRepo';
import Input from '../Components/Input';
import { useState } from 'react';
import { api } from '../Services/api';
import Header from '../Components/Header';

function App() {

  const[currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handerSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`);

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);
      
      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      } else{
        alert('Repositório já adicionado!');
        return;
      }
    } 
  }

  const handleRemoveRepo = (id) => {
    const updatedRepos = repos.filter(repo => repo.id !== id);
    setRepos(updatedRepos);
  }

  
    return (
        <>
            <Header />
            <Container>
                <img src={gitLogo} width={72} height={72} alt="logo github" />
                <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
                <Button onClick={handerSearchRepo}></Button>
                {repos.map(repo => (
                    <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />
                ))}
            </Container>
        </>
    );
}

export default App;
