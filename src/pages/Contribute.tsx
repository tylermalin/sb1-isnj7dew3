import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Upload, Video } from 'lucide-react';
import VideoRecorder from '../components/VideoRecorder';

export default function Contribute() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showVideoRecorder, setShowVideoRecorder] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { name, message });
    setSubmitted(true);
  };

  const handleRecordingComplete = (path: string) => {
    console.log('Video uploaded:', path);
    setShowVideoRecorder(false);
  };

  if (showVideoRecorder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto py-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Record Your Birthday Message</h2>
          <p className="text-gray-600 mt-2">Share your wishes with Emily in a personal video message</p>
        </div>
        
        <VideoRecorder 
          onRecordingComplete={handleRecordingComplete}
          userName={name}
        />
      </motion.div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto py-12"
      >
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank you for contributing!
          </h2>
          <p className="text-gray-600 mb-8">
            Your message has been recorded. Now, would you like to share some special memories with Emily?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => window.open('https://photos.app.goo.gl/CJiMfWrsxiETVqro8', '_blank')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl
                       font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300
                       flex flex-col items-center gap-3"
            >
              <Camera className="w-8 h-8" />
              <span className="text-lg">Share Photos</span>
              <p className="text-sm opacity-90">Add your favorite memories to Emily's photo album</p>
            </button>
            <button
              onClick={() => setShowVideoRecorder(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-xl
                       font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300
                       flex flex-col items-center gap-3"
            >
              <Video className="w-8 h-8" />
              <span className="text-lg">Record Message</span>
              <p className="text-sm opacity-90">Send Emily a personal video birthday wish</p>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Emily's Photo Gallery</h3>
            <div 
              className="pa-carousel-widget"
              style={{ width: '100%', height: '480px', display: 'none' }}
              data-link="https://photos.app.goo.gl/CJiMfWrsxiETVqro8"
              data-title="emily my amazing sis"
              data-description="49 new items added to shared album"
              data-delay="2"
            >
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOIsJa4yyl8ykUajK_q8fjjrsCEBJgwvK9-Pv7EqvAVVPBCnlGWbcheoKkPMYuO86K2rUZieaXmpAtYHyntA6a1fjfSrIKUqV8j2GggTvmopYqzox-6=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOxrBBfgQNDjXh5WsBhAGZK4WrvZjyUaZZcgOjYU-IUxKEDhbJGgOPhwssFcV5VhHzs-jTtTE-elTHSyJ9HsBm1SmpkSe26h0bX0fkz2Xrd7II7JH12=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPGvJFT2mRyxjUJjixeQSkRjz8WlYFeTDEkjHOQVh6XjFDzfz8lgD7qkfsiTeua1_Ps7Ej0hhe2px_d_2SxPNG1tkoj-cpLs4R4AfvpUL5kj9htvwbo=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMwmsZ5EM7tEzAIg0GkpJATsaBYhHhpZrsbjj44Wt5ML6NZPlUO3wZXZgWPSFoWpjiRLgEuViEZri8sw-at87QfCjnY2gEWujSpOFnc0H9g72rynHgq=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMQp5I0_EvSy6BstnWo1eX75F4D_xZkOU5KF708cUJyjcx7vXIydS74ygyEKY5kwr6hkDuyWTJd7h4KhepokEBw6MXZ2OyAXcN29KSNCGGfFV6oe9zJ=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczN5GUpcFf0010BGF43HQh6Nw1qDPat6_bGA364saisOJFyO92la9qE6YXUfRAzJxjXMNQZLDOfe0b5qzWgG1KRv6idd8whn2FC21-eaNC_XekUnbiAa=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOjD0gafv2E383xGvEosw9c8TvkoXk-urHdNgOg-SnHdaEQPulF9Jd92YljoonDy4FnTphR3uux8RRnlza6jiWxZ1E8nDfIHZ5AUPpeagliCyFWUtT4=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPqe3NmKPfEhusrga65U3zsd6_XEKPO0aZXIIjjLoKFlUvAszJrQhD7tPGG9KpTp2OIJo74lL9Ht2OVyD4Sfy65WJyLMEZUXA9btUD-Q6TwKaiE6Urk=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNTW95dUfyHQaDJggOy461fnQmfrEke1cSBwBkqKweFjO-W2864Oy7e4eQcwyNst6I-95fzttLmNku2A7__X7gPLD6QLYoamyqcSETHz-9FtziTz9m9=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMICl_DfzX-Pd_lgLZvZMo0EEfHhFZ0QByxbj1i0DgbeNSAOu-K-4bA6PHoxfW5jP19Lg3OuRiik8Q8SmTe8qoX7FM7u5l-HOyUH_2XzjOkec1Zog-c=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNPZGH4UUjZ4GrFeSeYZVnuyNd4h7YzwihehYZ6NuSVWRMBwsNirVOl0WyihZ1t1XMvd4PGqkaHUVojk6IVhQXE8gR9yT1HyO2Bz0AN0-8LvenpKHbw=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOnj7LAmCZp0AjZ-M3SVZ17XyePSnzXImX-6B12IN1pA-ZO7wChHZkGOodHfiYV1ZXfs6w3dR5hADPrTdMbPq-rlPvwJFUl0d7VkOMOfZU1_XURFfWG=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczN5LW1UoKDV3Z0menL3kVMVwPzpnNx-snqy1ts94ESmeX89x9wdEpmrvA-y8B0XxeL3V9w-D4qSAGZJp53IGvDgl5jP3X_7SDP5KlgfzM7opuBmPrHj=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczN6mZvnn4YwCN7xL5JG-ByLq6BabzFr3Zq2xMUYbebVl6RynemkgRZXlBvGci5kaqMCGxK9Spphk5odus2r9CRtp7ZQOM88J7fnlkSIgSIWOdijdt_s=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczN4W1Q-wRktJjfw12wd85oYwIdeE3iOYKI3cust1wVVVnJA2srLLAeA-cktEt5650a0JxwtKSEL1ry25e4FfyuMGwFxLQbT3Ws1zTUNm569UmLqB4rh=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczO4uzXbp8Bg8qZhYjG90TDRM0jIK7bPhHM-1gGpWRxb7S55DYbsE8H190IutuZG-5P0WiQJWufuOonpxI4lf0uGQIoXSl9QXBPNyCoGgZrIkQ4Rl2vk=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMbu0nhJ5C4UJlL-aglt88QCsSQq9aFNZmLS_84lBpO_DXJ8L7OT7rqT-Ws_x8LDXY-UIr-m8YkWJfvR5rpTq8Kf7SFfArpopnJiHhgeYHNZ0b6MWh4=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNcoHztZrS4tpKLbwA4zz_r0Up1wHF7ZzdNenzcQTGvwqEvlvbhps33HxU0dFt5MMKDtcVIhU4ydVvvzqATnG0lA8318ynKWXfkZPNcv0168LoUTBxO=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczN4ngAC8YfS4YirzkpNWQ-B0NWhphqTXYkJZvJ3S9QLUnrF9_NIljvthwjDhcPQR3YyKrHDFtUzXhnH2USwcT86K4qhyGknwKHqZ4i9Z4q5PfjxCFf-=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNS0fqQmKY5dojf99Zk4i29rOVFFuedTfPFrMgOzPlvXFHlngVLG1Va1sOONVIeZI4u_YgWgYH9cR2hP7r_3JIexjDezoH_-dRhieUHHl97yrEPFe0s=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOl8C0rKdwv6WQd80jhUogKftnV1tDp3Ryqu6ng4oaTpiJvjYqhQk3N7tRbFFhunLPx9MSq5thUf7QQFKpWP3rCQjxpxMPO-TIbv0MGfSD_xN43E02W=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNO0wj8Dd3WCnLT9GhnYLq8WUEdl52b7uIDamiJAVEfv4KZLBpchn5STGTaiJOwN87MIjlj-nOkPXKoBxy7mYfYoifn0tvTXiYE7PdtSkEgUJ_AcJpC=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczO2DMvEtWMj7lKUBGH0x3kc8qDd0LQ6NvC304HcJNMEb1SigSij_hNywwsf3kBbDiVBCG2-66Ot10NYPh8I2CKoUOZ_9bidAa2g5vcYLm6JzBjjHtU4=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOF9LdTHwI9H6zhLQoRf-7ZBc8m-TmQ3ZGbJY8oOtYtBOOyji6l-MW2zbuwFRMe5tUUVs0KB1KcuomVn0JJRy5OwXvKD4Aldh5HGV6Tno8lUwSoi-vR=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczM8Lk2uNkz6-ndwnkbLLubZnKtxyRNC6v5ahgIRYXvBXhz3msZ4Yk3a4KfhZd60d15NLY-seokCo69t17Ip3AfqOW-qgqw37vqjyZY8l_8-lozYS8sX=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMYBOgJCzOWhyWI1ncUMe47hDxM1SSir0GyJIaOcapmrLhS_vmu1A7XgT_K7hvcaVC-MIPSIiCOUfYG87fSJ93rXaF9F4NrL6w7bQeaVyGuZyO_o5nm=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczM7lx30X15KHht8i6UG3WycsqRvyosfNOVoGvgawvshiyxiazjccp4ZMQTpQfBsFPylfiNlfLPNCdz-VyexdFIy9obghz6b6aH4JusDNzvx8VyTBZ_2=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPGdxkcHuyvedyuXPy5h_k0xAspAxYjjXhcMvvhYT-jj0Uhz68yx6fX5FNDPzwdStllt77VLCK1MTFcaKa2fazk-rPTCsw7pian72WGTOgQSMiBf12i=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOtsz6j9NMWwzdhp-0pcLUJeHh85Bhw213_-kfSXkSiShIl8cZRVQHW9-4boQ1Nm4eXkwo4IyNSotrfeEbKph8Q9bsT8KMKPJnufwz34vPc-37Dek59=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPwVjGvPos0T_DAcllBQbMhqhhEZgXAHj3xHkqiU0c1HrK1cb7fu26g_2lMhPAjnuURqccjgpmZHn_vFr5NLeOGzhlqtIFAL0iaCD1wD2nzqHJf7jXq=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOajPVfLVleIXWSxiMEzzcQgMdwLI-Bf-RF4jSTFOtU3toTkOTEOA7ZF92CZczMBFXRdaw-kFN2r6Ddkh5F2F_o3h1B9RHm-7n7-fMxsH7pG5rMEKl8=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMb7ls-6Xa7ZFYSOfJapTKDEDKeWPIhHJmX-vaV4cMYgCet5F-LE7xrPFhqLLRqFhxF1cjyiy8aPQb52CxDzT8o5qfP4uQhHSXgq5cqDQTkJ5Oi6w0x=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMsu_VehmluQfz2rf1TKTQoYjaqZnEKwEfwlEkuP2YvfkOCV9HOB1_kLB-ucTORhWRddYAjPo6ttUe01RnrmR3QtNBWGbHtIJKhmvEWAl0WSO0hmi9Y=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczM6s6lNAH39g1YzoU0kfkCjU10kBuafj6HKLQWYbIKk2TeV7Pbo53iAa3rze06VSsWj0uI8WysFVhCgvjfKKi0zCH9e3ZBbUwmmeZG4AVqVX-6jKvhC=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNe8MTQW3d9zhNABQ9v4QbFQXDOvozQT6P8XtqGiuHFbAjghhmzOakWXFclzRzbwwvF1l1ZHe3kntFlokBgl-n73uisX-_2kr6yRmrSu_ZD_9u1OBiF=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPpSALuRdQZWydm_B3tAXAAyFeFwuYORr7U7HWrbO02MK2SqaKNKw-rxMSrJ5WLjLf11Od0C_b-Xq0Yt1Pte4SUa9U4Csl_lL2HZ5BJ5PHuYMFApyPb=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPZWs9wQ-J4lZle6lxwya90rxZtb18A0SoUiE4LuUZZ0cjQS4wXb0PZ60vQqYU6B6wHHpIlpt7xEW3b4JR1bGlJNOn1oDt8r6v2Puo71a1ntwbW_yvE=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPNGq5Rl8Ra6d5TXRPnQ-a4NkKU1pdwdLLbDFyqvq7zV_1z2Xmru1QQxdjDrv-BwX_IwaQXHqOgsDxYdSfy5TFwC_dfKbj4_qq1mnQkyPvLyb3gnhXD=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOQzcQtPvV1zToFKXm0AyDZIyfqUsjoy8k4kr9xRvuepz96hl3ssCXBSPm2jdQC_noh8-BZ0Fzj9wL531r_43BChSjWPIsomTrY0z3oyygbkEUdWYXM=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPfJyrZVw25OQogSTx1xCPxqwNlk26vei8X2SaC2lqxiJCY6WEFQReZBehFNKm0z1_sHJwzPZgJvCEpIVkdO43zVafyLD8JgrAb21FImL6WYY1rSG_5=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPa_pgxMKsVqvb8UZyNUb1dWlEXEgYIe502Ti_tmcOLQ0m86lUQ-mlyBr0fAS_lPe3eNeiXqggCHNiE63LfeOKWgX29bAg1pJsoRIgbqH0ieinO9D80=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNPjvanTyoTehEmfS7FoICdeySYtCs7LciH-kOVWg0ktt4vkE_AoPctoqQ11eLs77gu7NlET2Cv9SZ64pkhE4UDxcgKlyd6efRdWbz0_8awgCXbUJWi=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczM9i0IJM7yANmmWxfGYoIzERkGGmhNjVN6fiT5eEd0PKAlkKue6cDNeKowGrb4IyDBa588QWYBiVfyc5dRkcHZQmQ8QLi0-lnyoOQhxEtUrSACfhu7m=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczMwOShijBslLy05d_ObhZ1ObPxWu_zgkNB1wcuiT2Y1bpunGIQ3vBVrL0rHaEqe-Rh1Vu6f6tIS1EFwJntw3stOCqTf_dKzMSLtD1GTSeqPRxE0dNPS=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczNGyK2gc3PgIv_xcCRNmpfy_V0EEuEq4huqldOUiyrBbgNT4SxWuZt034A-TS11q5fPvE-QjzXQDZvHyu5XjtS1mkehRIjk7PGpin4talU4tqxEjkcf=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczPJXLFbWxymBrahv5LHSsjKyEOTmhIUhYloUtJ2Ate2hmDajmY_bpqJzJEqB5LikHw-cjd6rg5-VfNmIXt3DTiOCz8qngL68uog-KKGezXG5jK9i8OA=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOR3Q3O9BIXYmO4fgULzgYcm5x17vYU8JXRT5V_UsT0hdye2wUATM-AsAG5AMTXnPTwvepm1wF6DybxAf8rhmlca8BAhxLv9nQ0vXRlV2C7n2FcwzPH=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczM8BwIOdSAA4CvHlgO4n5c8JD66L-XHeI3PCzlkHHgY3dOvtEwLx785yE9AQB68EOztP0iWTrRfTWcoJKb7bIrWFzfHu4XzJOxy8MCeoxfd4ecnPeJ9=w1920-h1080"></object>
              <object data="https://lh3.googleusercontent.com/pw/AP1GczOydvg18P0EfswK3V0oDKiv81d_L-_caS0wmNz3kOr-MDamWbKybaj3r44iGSXdIviozH71Y4SXheV4JiBVt05iivdSdcb5n1NsWCU7Y6uwgyJgDQB7=w1920-h1080"></object>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto py-12"
    >
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Help Celebrate Emily!
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Share your favorite memory or wish for Emily's birthday celebration.
          After submitting, you'll be able to add photos and record a video message!
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Share your favorite memory or birthday wish..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full
                     font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300
                     flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Submit & Continue to Media Upload
          </button>
        </form>
      </div>
    </motion.div>
  );
}