import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Vibration, Keyboard } from "react-native";
import ResultImc from "./ResultImc/";
import styles from './style';

export default function Form(){

    const [ height, setHeight ] = useState(null);
    const [ weight, setWeight ] = useState(null);
    const [ messageImc, setMessageImc] = useState("Preencha o peso e altura!");
    const [ imc, setImc ] = useState(null);
    const [ textButton, setTextButton ] = useState("Calcular");
    const [ errorMessage, setErrorMessage ] = useState(null);

    function imcCalculator(){
        return setImc((weight/(height*height)).toFixed(2));
    }

    function verificationImc(){
        if( imc == null ){
            setErrorMessage("Campo obrigatório*")
            Vibration.vibrate();
        }
    }

    function validationImc(){
        if( weight != null && height != null ) {
            Keyboard.dismiss();
            imcCalculator();
            setHeight(null);
            setWeight(null);
            setErrorMessage(null);
            setMessageImc("Seu imc é igual:")
            setTextButton("Calcular novamente");
            return
        }
        setImc(null);
        setTextButton("Calcular");
        setMessageImc("Preencha o peso e altura!");
        verificationImc();
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>

                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 75"
                />
                <TouchableOpacity onPress={() => validationImc()} style={styles.ButtonCalculator}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
            </View>
        </View>
    );
}