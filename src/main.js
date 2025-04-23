document.addEventListener("DOMContentLoaded", function () {
  // Before-After Slider 1
  const sliderHandle = document.getElementById("sliderHandle");
  const beforeAfterSlider = document.getElementById("beforeAfterSlider");
  const beforeImage = beforeAfterSlider.querySelector(".before-image");
  const afterImage = beforeAfterSlider.querySelector(".after-image");
  let isDragging = false;
  sliderHandle.addEventListener("mousedown", function (e) {
    isDragging = true;
    e.preventDefault();
  });
  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
  beforeAfterSlider.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    const rect = beforeAfterSlider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderHandle.style.left = `${percent}%`;
    beforeImage.style.opacity = (100 - percent) / 100;
    afterImage.style.opacity = percent / 100;
  });

  // Before-After Slider 2
  const sliderHandle2 = document.getElementById("sliderHandle2");
  const beforeAfterSlider2 = document.getElementById("beforeAfterSlider2");
  const beforeImage2 = beforeAfterSlider2.querySelector(".before-image");
  const afterImage2 = beforeAfterSlider2.querySelector(".after-image");
  let isDragging2 = false;
  sliderHandle2.addEventListener("mousedown", function (e) {
    isDragging2 = true;
    e.preventDefault();
  });
  document.addEventListener("mouseup", function () {
    isDragging2 = false;
  });
  beforeAfterSlider2.addEventListener("mousemove", function (e) {
    if (!isDragging2) return;
    const rect = beforeAfterSlider2.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    sliderHandle2.style.left = `${percent}%`;
    beforeImage2.style.opacity = (100 - percent) / 100;
    afterImage2.style.opacity = percent / 100;
  });

  // Counter Animation
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // ms
    const step = target / (duration / 16); // 60fps
    let current = 0;
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });
    observer.observe(counter);
  });

  // Cognition Slider
  const cognitionSlider = document.getElementById("cognitionSlider");
  const cognitionText = document.getElementById("cognitionText");
  const cognitionStages = [
    "I feel completely normal and in control of my thoughts and actions.",
    "I'm starting to need more to feel the same effects. Sometimes I think about using when I should be focusing on other things.",
    "I can't concentrate without it. My thoughts are scattered and I'm constantly anxious when I can't use.",
    "I'm seeing things that aren't there. Everyone is watching me. They know what I've done. They're coming for me. I need to hide.",
    "The voices won't stop. There are insects under my skin. I need to get them out. WHY WON'T ANYONE HELP ME?",
  ];
  cognitionSlider.addEventListener("input", function () {
    const value = this.value;
    const stageIndex = Math.floor(value / 25);
    const stage = Math.min(stageIndex, cognitionStages.length - 1);
    cognitionText.innerHTML = `<p class="text-lg">${cognitionStages[stage]}</p>`;
    // Add visual effects based on stage
    cognitionText.style.filter = `blur(${stage * 0.5}px)`;
    cognitionText.style.transform = `scale(${1 + stage * 0.05})`;
    if (stage >= 3) {
      cognitionText.classList.add("glitch");
    } else {
      cognitionText.classList.remove("glitch");
    }
    if (stage >= 4) {
      cognitionText.style.color = "#ff0000";
      cognitionText.style.fontWeight = "bold";
    } else {
      cognitionText.style.color = "";
      cognitionText.style.fontWeight = "";
    }
  });

  // Brain Activity Chart
  const brainChart = echarts.init(document.getElementById("brainChart"));
  const option = {
    animation: false,
    title: {
      text: "Brain Activity During Addiction",
      left: "center",
      textStyle: {
        color: "#ffffff",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      data: ["Dopamine Response", "Cognitive Function", "Emotional Regulation"],
      bottom: 0,
      textStyle: {
        color: "#ffffff",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Healthy",
        "First Use",
        "Regular Use",
        "Dependency",
        "Addiction",
        "Long-term",
      ],
      axisLine: {
        lineStyle: {
          color: "#ffffff",
        },
      },
      axisLabel: {
        color: "#ffffff",
      },
    },
    yAxis: {
      type: "value",
      name: "Brain Function (%)",
      min: 0,
      max: 100,
      axisLine: {
        lineStyle: {
          color: "#ffffff",
        },
      },
      axisLabel: {
        color: "#ffffff",
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    series: [
      {
        name: "Dopamine Response",
        type: "line",
        data: [50, 95, 75, 60, 40, 20],
        smooth: true,
        lineStyle: {
          width: 4,
          color: "rgba(87, 181, 231, 1)",
        },
        itemStyle: {
          color: "rgba(87, 181, 231, 1)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(87, 181, 231, 0.3)" },
            { offset: 1, color: "rgba(87, 181, 231, 0.1)" },
          ]),
        },
        showSymbol: false,
      },
      {
        name: "Cognitive Function",
        type: "line",
        data: [90, 85, 70, 50, 30, 15],
        smooth: true,
        lineStyle: {
          width: 4,
          color: "rgba(141, 211, 199, 1)",
        },
        itemStyle: {
          color: "rgba(141, 211, 199, 1)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(141, 211, 199, 0.3)" },
            { offset: 1, color: "rgba(141, 211, 199, 0.1)" },
          ]),
        },
        showSymbol: false,
      },
      {
        name: "Emotional Regulation",
        type: "line",
        data: [85, 80, 60, 40, 20, 10],
        smooth: true,
        lineStyle: {
          width: 4,
          color: "rgba(251, 191, 114, 1)",
        },
        itemStyle: {
          color: "rgba(251, 191, 114, 1)",
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(251, 191, 114, 0.3)" },
            { offset: 1, color: "rgba(251, 191, 114, 0.1)" },
          ]),
        },
        showSymbol: false,
      },
    ],
  };
  brainChart.setOption(option);
  window.addEventListener("resize", function () {
    brainChart.resize();
  });

  // Fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );
  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  // Smoke effect on mouse move
  const smokeCanvas = document.getElementById("smokeCanvas");
  const particles = [];
  const maxParticles = 50;
  document.addEventListener("mousemove", function (e) {
    createParticle(e.clientX, e.clientY);
  });

  function createParticle(x, y) {
    if (particles.length >= maxParticles) {
      particles.shift();
    }
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    const size = Math.random() * 20 + 10;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    const hue = Math.random() * 30;
    particle.style.backgroundColor = `rgba(${255}, ${hue}, ${hue}, ${Math.random() * 0.3 + 0.1})`;
    smokeCanvas.appendChild(particle);
    particles.push(particle);
    animateParticle(particle);
  }

  function animateParticle(particle) {
    let opacity = 0.5;
    let size = parseFloat(particle.style.width);
    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);
    let velX = Math.random() * 2 - 1;
    let velY = Math.random() * -2 - 1;
    const animate = () => {
      if (opacity <= 0) {
        particle.remove();
        return;
      }
      opacity -= 0.01;
      size += 0.5;
      posX += velX;
      posY += velY;
      particle.style.opacity = opacity;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = posX + "px";
      particle.style.top = posY + "px";
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
});