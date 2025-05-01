import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Download, Camera, Video, MessageCircle, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import VideoRecorder from '../components/VideoRecorder';

function Final() {
  const [showVideoRecorder, setShowVideoRecorder] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    // Create a colorful confetti burst
    const colors = ['#c084fc', '#ec4899', '#f472b6', '#fb7185', '#fcd34d'];
    
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });

    // Follow-up bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: colors,
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: colors,
      });
    }, 400);

    // Final burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 600);
  }, []);

  const handleDownloadBadge = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c084fc'); // purple-400
    gradient.addColorStop(1, '#ec4899'); // pink-500
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Title
    ctx.font = 'bold 48px Arial';
    ctx.fillText('EmilyQuest Champion', canvas.width / 2, 150);
    
    // Completion text
    ctx.font = '24px Arial';
    ctx.fillText('Successfully completed the quest and showed their love for Emily', canvas.width / 2, 250);
    ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 290);
    
    // Achievements
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Achievements Unlocked:', canvas.width / 2, 380);
    
    ctx.font = '24px Arial';
    const achievements = [
      '🧠 Emily Expert',
      '😄 Memory Maker',
      '💝 Birthday Celebrator',
      '🌟 Quest Champion'
    ];
    
    achievements.forEach((achievement, index) => {
      ctx.fillText(achievement, canvas.width / 2, 430 + (index * 40));
    });

    // Download the badge
    const link = document.createElement('a');
    link.download = 'emily-quest-champion-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Trigger confetti on download
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#ec4899', '#f472b6', '#fb7185', '#fcd34d'],
    });
  };

  const handleStartRecording = () => {
    setShowNameInput(true);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameInput(false);
      setShowVideoRecorder(true);
    }
  };

  const handleRecordingComplete = (path: string) => {
    console.log('Recording completed:', path);
    setShowVideoRecorder(false);
  };

  if (showVideoRecorder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Record Your Birthday Message</h2>
          <p className="text-gray-600 mt-2">Share your wishes with Emily!</p>
        </div>
        <VideoRecorder
          onRecordingComplete={handleRecordingComplete}
          userName={userName}
        />
      </motion.div>
    );
  }

  if (showNameInput) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto"
      >
        <form onSubmit={handleNameSubmit} className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Before We Start Recording
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full
                       font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Continue to Recording
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Congratulations, Quest Champion! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          You've proven your knowledge of Emily and shown how much you care.
          Now it's time to celebrate and share your love!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md"
          >
            <Camera className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Photos</h3>
            <p className="text-gray-600 mb-4">Add your favorite memories to Emily's collection</p>
            <a
              href="https://photos.app.goo.gl/CJiMfWrsxiETVqro8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-500 text-white px-6 py-2 rounded-full
                       hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Upload Photos
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-rose-50 to-orange-50 p-6 rounded-xl shadow-md"
          >
            <Video className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Record Message</h3>
            <p className="text-gray-600 mb-4">Send Emily a personal birthday greeting</p>
            <button
              onClick={handleStartRecording}
              className="bg-rose-500 text-white px-6 py-2 rounded-full
                       hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              Record Video
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleDownloadBadge}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full
                       text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1
                       transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Your Champion Badge
            </button>
          </motion.div>

          <div className="flex items-center gap-2 text-gray-500">
            <Share2 className="w-4 h-4" />
            <span>Share your badge on social media with #EmilyQuest</span>
          </div>
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

        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
          <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <p className="text-lg text-gray-700">
            "Thank you for being part of Emily's special celebration.
            Your participation means the world to her and all of us!"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Final;