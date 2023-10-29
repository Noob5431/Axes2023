

import { useState } from 'react'
import { View ,StyleSheet} from 'react-native';
function App() {
    const [licencePlate, setLicencePlate] = useState("");
    const [isGood, setIsGood] = useState(0);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({licencePlate}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result!=2) {
            alert("Search successful");
            setLicencePlate("");
        }
    }
    return (
        <View style={styles.container}>
            <form action="">
                <input type="text" placeholder="licencePlate"
                value={licencePlate} onChange={(e) => setLicencePlate(e.target.value)} />
                <button type="submit"
                onClick={handleOnSubmit}>submit</button>
            </form>
 
        </View>
    );

    
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:"red",
  },
});

export default App;
