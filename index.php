<?php

 //get JSON
 $json = file_get_contents('http://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=736bbe5d8a6cc6ec2ebc1138ab70c706');

 //Stupid  array
 $data = json_decode($json,true);

 //show data
 var_dump($data);

 //description
 echo $data['weather'][0]['description'];
 
 //temperature
 echo $data['main']['temp'];


?> 