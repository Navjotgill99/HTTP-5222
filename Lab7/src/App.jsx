//Importing necessary components and styles
import Header from "./components/Header"
import Menu from "./components/Menu"
import DogList from "./components/DogList"
import CatList from "./components/CatList"
import OtherPetsList from "./components/OtherPetsList"
import Footer from "./components/Footer"
import './App.css';

//Main App component
function App() {

  return (
    <>
      {/* Including the Required component */}
      <Header />
      <Menu />
      <DogList />
      <CatList />
      <OtherPetsList />
      <Footer />
    </>
  )
}

export default App
