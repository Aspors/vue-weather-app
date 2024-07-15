<template>
    <div class="wrapper">
        <h1>Погода</h1>
        <p>Узнать погоду в {{ city === "" ? "вашем городе" : cityName }}</p>
        <input 
        type="text" 
        id="text" 
        v-model=" city"
        placeholder="Введите название города"
        >
        <button 
        v-if="city != ''"
        @click="getWeather()"
        >
        Получить погоду
        </button>
        <p v-show="error" class="error">{{ error }}</p>
    
            <i class="spinner" v-show="loading">
                <Spinner/>
            </i>

        <div v-if="!loading && weatherData !== undefined">
            <ol>
                <li>
                    Температура: 
                    <span>
                        {{ weatherData?.data.main.temp }}°C
                    </span>
                </li>
                <li>
                    Ощущается, как:
                    <span>
                        {{ weatherData?.data.main.feels_like }}°C
                    </span>
                </li>
                <li>
                    Погода:
                    <span>
                        {{ weatherData?.data.weather[0].description.capitalize() }}
                    </span>
                </li>
            </ol>
        </div>
    </div>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue';
import axios from 'axios';
import type IWeatherData from './app.types';

const _API_URL = (cityName: string) => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=ddf0414887fac054f8980a218e1033c3&lang=ru`

const city = ref('');
const weatherData = ref<IWeatherData>();
const loading = ref(false);
const error = ref('');

String.prototype.capitalize = function() {
    if (!this) return this;
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const cityName = computed(() => {
    return `"${city.value}"`
})

const getWeather = async() =>{

    loading.value = true;

    if(city.value.trim().length < 2) {
        loading.value = false;
        error.value = 'Название должно быть больше одного символа!';

        return false;
    }

    axios
        .get(_API_URL(city.value))
        .then( res => {
            return weatherData.value = res as IWeatherData;
        })
        .catch(result => {
            loading.value = false;

            if(result.response.status >= 400 && result.response.status < 500){
                error.value = "Введено неверное название города";
                weatherData.value = undefined;
                return
            } else {
                error.value = "Сервер отъебнул, айм сорри:D";
                return
            }
        })
        .finally(() => {
            loading.value = false;
        })

    error.value = ""

    
}

</script>

<style lang="sass" scoped>
    .wrapper
        width: 900px
        height: 900px
        border-radius: 50px
        background: #eee
        text-align: center
        color: #000
        padding-top: 50px

        h1
            margin-top: 50px
        

        p 
            margin-top: 20px

        input
            margin-top: 30px
            background: transparent
            border: 0
            border-bottom: 2px solid #110813
            color: black
            font-size: 16px
            padding: 5px 8px
            outline: none
            &:focus
                border-bottom-color: #6e2d7d    

        button
            background: #e3bc4b
            color: #fff
            border-radius: 10px
            border: 2px solid #b99935
            padding: 10px 15px
            margin-left: 20px
            cursor: pointer
            transition: transform .5s ease
            &:hover
                transform: scale(1.1) translateX(-5px)
        
        .error
            color: red

        .spinner
            display: block
            margin-top: 20px
            svg
                width: 10%
                height: 10%



</style>

