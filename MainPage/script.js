
//load image
var imgChick = document.getElementById('chick');
imgChick.width = 300;
imgChick.height = 210;
var imgCat = document.getElementById('cat');
imgCat.width = 210;
imgCat.height = 210;
var imgSun = document.getElementById('sun');
imgSun.width = 120;
imgSun.height = 120;
var imgGrass = document.getElementById('grass');
imgGrass.width = 100;
imgGrass.height = 100;
var imgRain = document.getElementById('rain');
imgRain.width = 120;
imgRain.height = 120;
var imgChichi = document.getElementById('Chichi');
imgChichi.width = 300;
imgChichi.height = 400;
var imgCheshire = document.getElementById('Cheshire');
imgCheshire.width = 300;
imgCheshire.height = 400;

let rainingInterval = null;
// var imgRaindrop = document.getElementById('Raindrop');
// imgRaindrop.width = 50;
// imgRaindrop.height = 50;

//move
var leftPosition = -50;
let speed = 0.4;

let pauseChick = false;


var start = Date.now();


//background
let bgRain = "#7798AB";
let bgSun = "#FEFAF3";
let bgGrass = "#CADF9E";
let bgC = bgSun;

//#FEFAF3 sun #CADF9E green #7798AB blue rainy 

backgroundColor();
function backgroundColor(){
    document.body.style.backgroundColor = bgC;
    requestAnimationFrame(backgroundColor);
}


function moveChick() {
    if (!pauseChick) { // 如果不是暂停状态，则更新位置
        // 计算新的位置
        leftPosition += speed;

        // 更新图像的位置
        imgChick.style.left = leftPosition + 'px';
        
        
        if( leftPosition<1100){
            imgChichi.style.left = leftPosition + 70+ 'px';
        }else{
            imgChichi.style.left = leftPosition - 370+ 'px';
        }
        

        // 检查图像是否到达页面的右边界
        if (leftPosition < window.innerWidth + 60) {
            requestAnimationFrame(moveChick);
        } else {
            leftPosition = -50;
            requestAnimationFrame(moveChick);
        }
    }
}




function moveCat(){
  
        var now = Date.now(); // 当前时间
    var deltaTime = now - start; // 从动画开始至今的时间差（毫秒）
    var sinValue = Math.sin(deltaTime / 350); // 使用时间差计算sin值，这里除以1000将毫秒转换为秒

    imgCat.style.bottom = 50 + sinValue * 60 + 'px'; // 设置图片的底部位置，基础值加上sin值的变化产生浮动效果

    requestAnimationFrame(moveCat); // 请求下一帧继续动画
    
}

// 监听鼠标悬停事件
imgChick.addEventListener('mouseover', function() {
    pauseChick = true; // 暂停动画
    imgChichi.style.display = 'block';

});
imgChick.addEventListener('mouseout', function() {
    pauseChick = false; // 继续动画
    moveChick(); // 重新开始动画
    imgChichi.style.display = 'none';
});

imgChichi.addEventListener('mouseover', function() {
    pauseChick = true; // 暂停动画
     imgChichi.style.display = 'block';
});
imgChichi.addEventListener('mouseout', function() {
    pauseChick = false; // 继续动画
    moveChick(); // 重新开始动画
    imgChichi.style.display = 'none';
});

imgCat.addEventListener('mouseover', function() {
    imgCheshire.style.display = 'block';
});
imgCat.addEventListener('mouseout', function() {
    imgCheshire.style.display = 'none';
});
imgCheshire.addEventListener('mouseover', function() {
    imgCheshire.style.display = 'block';
});
imgCheshire.addEventListener('mouseout', function() {
    imgCheshire.style.display = 'none';
});

imgSun.addEventListener('mouseover', function() {
    bgC = bgSun;
});
imgGrass.addEventListener('mouseover', function() {
    bgC = bgGrass;
});


imgRain.addEventListener('mouseout', function() {
    if (rainingInterval !== null) {
        clearInterval(rainingInterval);
        rainingInterval = null; // 重置定时器
    }
});

imgCheshire.addEventListener('click', function() {
    window.location.href = 'https://cestme.github.io/SharedMinds_Elodie/CatEatingPizza/';
});

imgChichi.addEventListener('click', function() {
    window.location.href = 'https://cestme.github.io/Code/SootSprite/';
});



// 开始动画
moveChick();
moveCat();


//Rain
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

imgRain.addEventListener('mouseover', function() {
    bgC = bgRain;

    if (rainingInterval === null) {
        rainingInterval = setInterval(() => {
            for (let i = 0; i < getRandomNumber(1, 5); i++) { // 每次间隔生成1到5滴雨
                createRaindrop();
            }
        }, 500); // 每200毫秒生成新的雨滴
    }
});

function createRaindrop() {
    var imgRaindrop = document.createElement('img'); // 动态创建一个新的Raindrop图片元素
    imgRaindrop.src = 'raindrop.png';
    imgRaindrop.style.position = 'fixed';
    imgRaindrop.style.left = getRandomNumber(0, window.innerWidth) + 'px'; // 随机位置
    imgRaindrop.style.top = '-50px'; // 开始时在屏幕顶端之外
    imgRaindrop.width = 50;
    imgRaindrop.height = 50;

    document.body.appendChild(imgRaindrop); // 将Raindrop添加到页面中

    // 动画使Raindrop下落
    var intervalId = setInterval(function() {
        imgRaindrop.style.top = parseInt(imgRaindrop.style.top) + getRandomNumber(1, 5) + 'px'; // 每次下移5到10px，增加随机性

        if (parseInt(imgRaindrop.style.top) > window.innerHeight) {
            clearInterval(intervalId); // 当Raindrop移出屏幕时停止动画
            document.body.removeChild(imgRaindrop); // 并从DOM中移除该元素
        }
    }, 20); // 加快下落速度
}