import React,{useState, useEffect} from 'react';

import axios from 'axios';

import { IoMdsunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch, IoIosSunny, IoMdSunny } from 'react-icons/io'

import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsSnow, BsRainbow, BsCloudRainHeavy } from 'react-icons/bs'

import { TbTemperatureCelsius } from 'react-icons/tb'

import { ImSpinner8 } from 'react-icons/im'

const API_KEY= '76faa09330f959a378b2280ffb23e9f7';
const date = new Date();

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('VietNam');

  const [inputValue, setInputValue] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  }

  const handleSumbit = (e) => {
     

      if(inputValue !== ' '){
        setLocation(inputValue);
      }

      const input = document.querySelector('input')

      input.value = '';


      e.preventDefault();
  }

  useEffect(()=> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(url).then((res) => {
      setData(res.data);
    })
  }, [location]);

  console.log(data)

  if(!data){
    return (
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  let icon;

  switch (data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;

    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    
    case 'Rain':
      icon = <IoMdRainy />;
      break;

    case 'Clear':
      icon = <IoMdSunny />
      break;

    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break;
    
    case 'Snow':
      icon = <IoMdSnow/>
      break;

    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
    }

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat 
    bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'> 

      {/* form */}
      <form className='h16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8'>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input onChange={(e) => handleInput(e)} type='text' placeholder='Search by city or country' className='flex-1 bg-transparent outline-none
           placeholder:text-white text-white text-[15px] font-light pl-4 h-full'></input>
          <button onClick={(e) => handleSumbit(e)} className='bg-blue-400 h-12 w-20 rounded-full 
          flex items-center justify-center hover:bg-blue-600'><IoMdSearch className='text-3xl'/></button>
        </div>
      </form>

      {/* card */}
      <div className='w-full max-w[450px] bg-black/20 min-h-[584px]
       text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 '>
       
        <div >

          {/* card header */}
          <div className=' flex items-center gap-x-5'>

            <div className='text-[87px]'>{icon}</div>
            
            <div>
              {/* country name */}
              <div className='text-2xl'>{data.name}, {data.sys.country}</div>
              {/* date */}
              <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
            </div>

          </div>

          {/* card body */}
          <div className='my-20 '>

            <div className='flex justify-center items-center'>
              <div className='flex'>
                    {/* nhiet do */}
                <div className='text-[140px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                  {/* icon nhiet do */}
                <div className='text-5xl'>
                    <TbTemperatureCelsius/>
                </div>
              </div>
            </div>

            <div className='capitalize text-2xl text-center'>
               {data.weather[0].description}
            </div>

          </div>


          {/* card bottom */}
          <div className='flex flex-col max-w-[378px] mx-auto gap-y-6'>
            <div className='flex justify-between'>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  {/* icon */}
                  <BsEye/>
                </div>
                <div>
                  Visibility <span className='ml-2'>{data.visibility /1000} </span> 
                  km
                </div>
              </div>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  {/* icon */}
                  <BsThermometer/>
                </div>
                <div className='flex'>
                  Feels like <span className='flex ml-2'>{parseInt(data.main.feels_like)} 
                  <TbTemperatureCelsius/>
                  </span> 
                  
                </div>

              </div>
            </div>

            <div className='flex justify-between'>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  {/* icon */}
                  <BsWater/>
                </div>
                <div>
                Humidity <span className='ml-2'>{data.main.humidity}</span> 
                %</div>
              </div>

              <div className='flex items-center gap-x-2'>
                <div className='text-[20px]'>
                  {/* icon */}
                  <BsWind/>
                </div>
                <div className='flex'>
                 Wind<span className='flex ml-2'>{data.wind.speed} 
                 m/s</span> 
                  
                </div>

              </div>
            </div>

            

          </div>

        </div>
      </div>

    </div>
  )
};

export default App;
