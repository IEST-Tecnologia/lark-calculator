import { SVGAttributes, useEffect, useMemo, useState } from "react";
import tools from "./tools.json";
import { Slider } from "@mui/material";
import Tooltip from "./Tooltip";

interface Tool {
  id: number;
  name: string;
  img: string;
  checked: boolean;
}

const DigitScroll = ({ digit }: { digit: number }) => {
  const translateY = -digit * 32;

  return (
    <div
      className="transform transition-all duration-1000 flex text-center flex-col opacity-100 shrink-0 w-[22px] leading-8"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div>0</div>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
    </div>
  );
};

const NumberScroll = ({ checkedCount }: { checkedCount: number }) => {
  const digits = String(checkedCount).split("").map(Number);

  return (
    <div className="flex">
      {digits.map((digit, index) => (
        <DigitScroll key={index} digit={digit} />
      ))}
    </div>
  );
};

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 1000,
    label: "1000+",
  },
];

function App() {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [checkedCount, setCheckedCount] = useState<number>(3);
  const [sliderValue, setSliderValue] = useState(100);
  const costLark = sliderValue <= 50 ? 0 : sliderValue <= 500 ? 90 : 150;

  const valueSavings = useMemo(() => {
    return sliderValue * (80 * checkedCount - costLark) * 12;
  }, [sliderValue, checkedCount, costLark]);

  const getStep = () => {
    if (sliderValue < 10) {
      return 1;
    } else if (sliderValue < 100) {
      return 10;
    } else {
      return 100;
    }
  };

  function handleSliderChange(_: Event, newValue: number | number[]) {
    if (typeof newValue === "number") {
      const modifiedValue =
        newValue < 10 ? newValue : Math.floor(newValue / 10) * 10;
      setSliderValue(modifiedValue);
    }
  }

  function valuetext(value: number) {
    return `${value}`;
  }

  const handleToolClick = (id: number) => {
    setFilteredTools((prevTools) => {
      let selectedCount = checkedCount;

      const updatedTools = prevTools.map((tool) => {
        if (tool.id === id) {
          if (tool.checked && selectedCount < 3) {
            return tool;
          }

          const updatedTool = { ...tool, checked: !tool.checked };
          if (updatedTool.checked) {
            selectedCount += 1;
          } else {
            selectedCount -= 1;
          }

          return updatedTool;
        }
        return tool;
      });

      setCheckedCount(selectedCount);
      return updatedTools;
    });
  };

  useEffect(() => {
    const count = filteredTools.filter((tool) => tool.checked).length;
    setCheckedCount(count);
  }, [filteredTools]);

  return (
    <>
      <div className="flex items-center content-center flex-none flex-row flex-wrap gap-[10px] min-h-min justify-center overflow-hidden p-20 relative w-full">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <img
            className="block w-full h-full object-cover object-center"
            src="/bg-calculator.jpeg"
            alt="Imagem de fundo"
          />
        </div>
        <div className="flex-none h-auto max-w-full relative w-auto">
          <div className="flex items-end justify-between max-w-[1320px]">
            <div className="flex flex-col w-[54%]">
              <p className="font-bold text-4xl relative pr-[60px] leading-10">
                Corte gastos com Lark.
              </p>
              <p className="font-bold text-4xl relative pr-[60px] leading-10 mb-3">
                Faça mais com menos.
              </p>
              <p className="font-normal mb-8 text-base relative pr-[60px] leading-10">
                Cálculo baseado em estudos de caso reais de clientes do Lark
              </p>
              <div className="flex flex-col bg-white shadow-sm rounded-xl relative">
                <div className="absolute top-[-89px] right-[-45px]">
                  <ArrowIcon />
                </div>
                <p className="m-10 ml-10 font-medium text-lg leading-7">
                  Qual a quantidade de colaboradores na sua empresa?
                </p>

                <div className="flex flex-col items-center px-14 mt-4 mb-4">
                  <Slider
                    value={sliderValue}
                    getAriaValueText={valuetext}
                    min={1}
                    max={1000}
                    step={getStep()}
                    valueLabelDisplay="auto"
                    onChange={handleSliderChange}
                    marks={marks}
                    sx={{
                      height: 12,
                      padding: 1,
                      "& .MuiSlider-thumb": {
                        height: 24,
                        width: 24,
                        backgroundColor: "#fff",
                        border: "2px solid currentColor",
                        "&:hover": {
                          boxShadow: "inherit",
                        },
                      },
                      "& .MuiSlider-track": {
                        background:
                          "linear-gradient(90deg, rgb(51, 112, 255) 0%, rgb(36, 196, 255) 100%)",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#d3d3d3",
                      },
                      "& .MuiSlider-mark": {
                        height: 8,
                        width: 8,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                      },
                      "& .MuiSlider-markLabel": {
                        fontSize: "0.75rem",
                      },
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "#111827",
                        color: "#fff",
                        borderRadius: "12px",
                      },
                    }}
                  />
                </div>

                <div className="mt-8 mb-8 bg-gray-300 h-[1px]"></div>
                <p className="ml-10 font-medium text-lg leading-4">
                  Quais ferramentas você usa?
                </p>
                {checkedCount < 3 && (
                  <div className="mt-4 mx-10">
                    <p className="py-2 px-4 bg-[#feead2] flex rounded-md items-center gap-2 text-sm font-semibold">
                      <AlertIcon /> Selecione pelo menos 2 opções para um
                      cálculo preciso.
                    </p>
                  </div>
                )}
                <div className="flex flex-wrap px-[30px] pt-[30px] pb-[14px]">
                  {filteredTools.map((tool: Tool) => (
                    <div
                      className="py-3 px-[10px] relative"
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <Tooltip orientation="top" text={tool.name}>
                        <div
                          className={`flex justify-center items-center relative w-16 h-16 bg-transparent shadow rounded-xl border ${
                            tool.checked ? "border-[#3370FF]" : ""
                          }`}
                        >
                          <div className="relative">
                            <img src={tool.img} alt={tool.name} />
                          </div>
                          {tool.checked && (
                            <div className="absolute top-[-12px] right-[-12px]">
                              <CheckBlueIcon />
                            </div>
                          )}
                        </div>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[40%]">
              <div className="flex flex-col justify-around bg-white shadow-sm rounded-3xl p-10 pt-20 min-h-[646px]">
                <div className="absolute top-[-44px] self-center">
                  <div className="pt-5 pl-4 w-[88px] h-[88px] bg-white shadow-sm rounded-xl">
                    <LarkIcon />
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex">
                    <div className="flex text-[#3370FF] font-bold text-[36px] leading-[36px]">
                      <div className="flex w-fit relative items-baseline my-[0.1em]">
                        <div className="relative flex mr-[0.2em] overflow-hidden h-[32px] transition-all duration-1000 ease-in-out">
                          <NumberScroll checkedCount={checkedCount} />
                        </div>
                      </div>
                    </div>
                    <p className="inline-block m-0 font-bold text-[36px] leading-[36px] bg-gradient-to-r from-[#3370FF] to-[#24C4FF] bg-clip-text text-transparent">
                      apps
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="font-medium text-lg leading-8 text-[#646A73] inline pr-2">
                      Estima-se que o{" "}
                      <span className="p-2 bg-gradient-to-r from-[#3370FF] to-[#24C4FF] rounded-full font-bold text-base text-white">
                        {sliderValue <= 50
                          ? "Lark Básico"
                          : sliderValue <= 500
                          ? "Lark Pro"
                          : "Lark Enterprise"}
                      </span>{" "}
                      possa substituir e complementar pelo menos {checkedCount}{" "}
                      de suas ferramentas de negócios existentes.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-3">
                      <p className="m-0 font-bold text-3xl text-[#3370FF]">
                        Economize{" "}
                        <span className="ml-2">
                          R$ {valueSavings.toLocaleString()}
                        </span>
                        <span className="text-2xl leading-8 font-bold bg-gradient-to-r from-[#3370FF] to-[#24C4FF] bg-clip-text text-transparent">
                          /ano
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="font-medium leading-8 text-[#646A73] text-lg">
                        Para uma empresa com {sliderValue} colaboradores o Lark
                        pode economizar um custo total de pelo menos R$
                        {valueSavings.toLocaleString()} por ano.
                      </p>
                    </div>
                    <div className="self-stretch py-3 px-10 bg-gradient-to-r from-[#3370FF] to-[#4E83FD] font-medium text-base leading-6 text-center text-white mt-10 rounded-full">
                      Começe a economizar com Lark hoje.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ArrowIcon({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="106"
      height="89"
      viewBox="0 0 106 89"
      fill="none"
      className={"text-white " + className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.991 29.4286C105.4 29.8613 105.393 30.5399 104.975 30.9644L77.499 58.9079C76.8046 59.6141 75.6033 59.1224 75.6033 58.132L75.6033 43.7298C44.4224 45.5769 17.3934 62.9674 2.05688 88.3124C1.44532 89.323 -0.121288 88.8529 0.0080223 87.6788C4.32322 48.4958 36.1441 17.6614 75.6032 15.1709L75.6032 1.10883C75.6032 0.107763 76.8266 -0.378808 77.5141 0.348826L104.991 29.4286Z"
        fill="url(#paint0_linear_133_1617)"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_133_1617"
          x1="105.465"
          y1="27.3089"
          x2="0.0683161"
          y2="88.8645"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3370FF" stopOpacity="0.5"></stop>
          <stop offset="1" stopColor="#01D5BA" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AlertIcon({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={"text-white " + className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_333_1864)">
        <path
          d="M8 15.3333C12.0501 15.3333 15.3333 12.05 15.3333 7.99996C15.3333 3.94987 12.0501 0.666626 8 0.666626C3.94991 0.666626 0.666664 3.94987 0.666664 7.99996C0.666664 12.05 3.94991 15.3333 8 15.3333Z"
          fill="#FF8800"
        ></path>
        <path
          d="M8 4.66663C7.63181 4.66663 7.33334 4.9651 7.33334 5.33329V8.66663C7.33334 9.03482 7.63181 9.33329 8 9.33329C8.36819 9.33329 8.66667 9.03482 8.66667 8.66663V5.33329C8.66667 4.9651 8.36819 4.66663 8 4.66663Z"
          fill="white"
        ></path>
        <path
          d="M8 11.3333C8.36819 11.3333 8.66667 11.0348 8.66667 10.6666C8.66667 10.2984 8.36819 9.99996 8 9.99996C7.63181 9.99996 7.33334 10.2984 7.33334 10.6666C7.33334 11.0348 7.63181 11.3333 8 11.3333Z"
          fill="white"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_333_1864">
          <rect width="16" height="16" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export function CheckBlueIcon({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"text-white " + className}
      {...props}
    >
      <rect x="1" y="1" width="22" height="22" rx="11" fill="white"></rect>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 12C1 18.0758 5.92422 23 12 23C18.0758 23 23 18.0758 23 12C23 5.92422 18.0758 1 12 1C5.92422 1 1 5.92422 1 12ZM7.47227 11.7986C7.74076 11.5302 8.17606 11.5302 8.44454 11.7986L10.4725 13.8266L15.9379 8.36114C16.2064 8.09265 16.6417 8.09265 16.9102 8.36114L17.3964 8.84727C17.6648 9.11576 17.6648 9.55106 17.3964 9.81954L11.0766 16.1393C10.9461 16.2698 10.7762 16.3369 10.6052 16.3405C10.3664 16.4194 10.0929 16.3638 9.90295 16.1739L6.98614 13.257C6.71765 12.9886 6.71765 12.5533 6.98614 12.2848L7.47227 11.7986Z"
        fill="#3370FF"
      ></path>
    </svg>
  );
}

export function LarkIcon({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width="67"
      height="54"
      viewBox="0 0 67 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"text-white " + className}
      {...props}
    >
      <g clipPath="url(#clip0_64_766)">
        <path
          d="M34.5398 27.3885L34.6988 27.2294C34.8022 27.126 34.9136 27.0147 35.025 26.9113L35.2477 26.6965L35.9078 26.0443L36.8146 25.1614L37.5861 24.3979L38.3099 23.682L39.0655 22.9343L39.7575 22.2503L40.7279 21.2959C40.9108 21.1129 41.1017 20.9379 41.2926 20.763C41.6425 20.4448 42.0084 20.1346 42.3743 19.8324C42.7163 19.5619 43.0663 19.2994 43.4242 19.0449C43.9253 18.687 44.4423 18.3609 44.9672 18.0427C45.4842 17.7405 46.0172 17.4542 46.558 17.1837C47.0671 16.9372 47.592 16.7065 48.1249 16.4997C48.4192 16.3804 48.7215 16.277 49.0237 16.1736C49.1748 16.1259 49.326 16.0702 49.485 16.0225C48.1408 10.7332 45.6831 5.80178 42.2709 1.54648C41.6107 0.727231 40.6085 0.25 39.5586 0.25H11.6804C11.3941 0.25 11.1555 0.480662 11.1555 0.774954C11.1555 0.941984 11.235 1.09311 11.3702 1.19651C20.883 8.17202 28.7732 17.136 34.4761 27.4601L34.5398 27.3885Z"
          fill="#00D6B9"
        ></path>
        <path
          d="M23.4583 51.9259C37.8548 51.9259 50.398 43.98 56.9361 32.2401C57.1667 31.8265 57.3895 31.4129 57.6042 30.9914C57.2781 31.6197 56.9122 32.2242 56.5066 32.7969C56.3634 32.9957 56.2202 33.1946 56.0691 33.3934C55.8782 33.64 55.6873 33.8707 55.4885 34.1013C55.3294 34.2843 55.1703 34.4593 55.0033 34.6342C54.6692 34.9842 54.3193 35.3183 53.9534 35.6285C53.7466 35.8035 53.5477 35.9705 53.333 36.1296C53.0864 36.3205 52.8319 36.5034 52.5774 36.6704C52.4183 36.7818 52.2513 36.8852 52.0842 36.9886C51.9172 37.092 51.7422 37.1954 51.5593 37.2988C51.2013 37.4976 50.8275 37.6885 50.4537 37.8556C50.1276 37.9987 49.7935 38.1339 49.4594 38.2612C49.0936 38.3964 48.7277 38.5157 48.3459 38.6191C47.7812 38.7782 47.2165 38.8975 46.6358 38.985C46.2222 39.0486 45.7927 39.0964 45.3712 39.1282C44.9257 39.16 44.4724 39.1679 44.019 39.1679C43.5179 39.16 43.0168 39.1282 42.5078 39.0725C42.1339 39.0327 41.7601 38.977 41.3863 38.9134C41.0602 38.8577 40.7341 38.7862 40.408 38.7066C40.233 38.6668 40.0659 38.6191 39.891 38.5714C39.4137 38.4441 38.9365 38.3089 38.4593 38.1737C38.2206 38.1021 37.982 38.0385 37.7514 37.9669C37.3934 37.8635 37.0435 37.7522 36.6935 37.6408C36.4072 37.5533 36.1208 37.4579 35.8345 37.3624C35.5641 37.2749 35.2857 37.1874 35.0152 37.092L34.4585 36.9011C34.2358 36.8216 34.0051 36.742 33.7824 36.6625L33.3052 36.4875C32.987 36.3761 32.6688 36.2568 32.3586 36.1375C32.1757 36.0659 31.9928 36.0023 31.8098 35.9307C31.5633 35.8353 31.3246 35.7398 31.0781 35.6444C30.8235 35.541 30.5611 35.4376 30.3065 35.3342L29.8055 35.1274L29.1851 34.8729L28.7078 34.674L28.2147 34.4593L27.7852 34.2684L27.3954 34.0934L26.9977 33.9104L26.5921 33.7195L26.0751 33.4809L25.5342 33.2264C25.3433 33.131 25.1524 33.0435 24.9616 32.948L24.4764 32.7094C15.918 28.4382 8.19481 22.6796 1.65674 15.6961C1.45789 15.4893 1.13179 15.4734 0.917031 15.6722C0.813631 15.7677 0.75 15.9108 0.75 16.054L0.765908 40.6553V42.6517C0.765908 43.813 1.33859 44.8947 2.301 45.539C8.56069 49.7227 15.926 51.9418 23.4583 51.9259Z"
          fill="#3370FF"
        ></path>
        <path
          d="M65.7655 17.2479C60.9057 14.8697 55.3459 14.3606 50.1362 15.8241C49.9135 15.8878 49.6987 15.9514 49.484 16.015C49.3328 16.0627 49.1817 16.1105 49.0226 16.1661C48.7204 16.2695 48.4181 16.3809 48.1239 16.4922C47.591 16.699 47.0739 16.9297 46.5569 17.1763C46.0161 17.4388 45.4832 17.7251 44.9662 18.0273C44.4333 18.3375 43.9242 18.6716 43.4231 19.0295C43.0652 19.284 42.7152 19.5465 42.3732 19.817C41.9994 20.1192 41.6415 20.4214 41.2915 20.7475C41.1006 20.9225 40.9177 21.0975 40.7268 21.2805L39.7564 22.2349L39.0644 22.9189L38.3088 23.6666L37.585 24.3825L36.8135 25.146L35.9147 26.0369L35.2545 26.6891L35.0318 26.9038C34.9284 27.0072 34.8171 27.1186 34.7057 27.222L34.5467 27.381L34.3001 27.6117C34.2046 27.6992 34.1171 27.7787 34.0217 27.8662C31.6276 30.0695 28.9551 31.9545 26.0838 33.4896L26.6008 33.7282L27.0064 33.9191L27.4041 34.102L27.7938 34.277L28.2234 34.4679L28.7165 34.6827L29.1937 34.8815L29.8141 35.136L30.3152 35.3428C30.5697 35.4462 30.8322 35.5496 31.0867 35.653C31.3253 35.7485 31.5719 35.8439 31.8185 35.9394C32.0014 36.011 32.1844 36.0746 32.3673 36.1462C32.6855 36.2655 33.0036 36.3768 33.3138 36.4962L33.791 36.6711C34.0137 36.7507 34.2365 36.8302 34.4671 36.9097L35.0239 37.1006C35.2943 37.1881 35.5647 37.2836 35.8431 37.3711C36.1295 37.4665 36.4158 37.554 36.7021 37.6495C37.0521 37.7608 37.41 37.8642 37.76 37.9756C37.9986 38.0471 38.2372 38.1187 38.4679 38.1824C38.9451 38.3176 39.4224 38.4528 39.8996 38.5801C40.0746 38.6278 40.2416 38.6675 40.4166 38.7153C40.7427 38.7948 41.0688 38.8584 41.3949 38.9221C41.7687 38.9857 42.1426 39.0414 42.5164 39.0811C43.0254 39.1368 43.5265 39.1686 44.0276 39.1766C44.481 39.1845 44.9344 39.1686 45.3798 39.1368C45.8093 39.105 46.2308 39.0573 46.6444 38.9937C47.2171 38.9062 47.7898 38.7789 48.3545 38.6278C48.7283 38.5244 49.1022 38.4051 49.4681 38.2699C49.8021 38.1506 50.1362 38.0153 50.4623 37.8642C50.8361 37.6972 51.2099 37.5063 51.5679 37.3074C51.7429 37.212 51.9178 37.1086 52.0928 36.9972C52.2678 36.8938 52.4269 36.7825 52.586 36.6791C52.8405 36.5041 53.095 36.3291 53.3416 36.1382C53.5563 35.9792 53.7631 35.8121 53.962 35.6371C54.3199 35.3269 54.6699 34.9929 55.0039 34.6429C55.171 34.4679 55.33 34.2929 55.4891 34.11C55.688 33.8793 55.8868 33.6407 56.0697 33.4021C56.2209 33.2112 56.364 33.0124 56.5072 32.8056C56.9049 32.2329 57.2708 31.6364 57.5969 31.016L57.9707 30.2762L61.2954 23.6507L61.3352 23.5712C62.4328 21.2009 63.9281 19.0693 65.7655 17.2479Z"
          fill="#133C9A"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_64_766">
          <rect
            width="66"
            height="53.1667"
            fill="white"
            transform="translate(0.75 0.25)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

export default App;
