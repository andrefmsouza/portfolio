"use client";

import { useEffect, useState, use } from "react";
import { useTranslations } from '@/hooks/useTranslations';
import { useTheme } from '@/hooks/useTheme';
import Image from 'next/image';
import { FaArrowUp, FaGithub, FaLinkedin, FaSun } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { SkillsBubbles } from "@/components/SkillsBubbles";
import Link from "next/link";

interface Props {
  params: Promise<{
    lang: 'pt' | 'en'
  }>
}

export default function Home({ params }: Props) {
  const { lang } = use(params);
  const { t, language, changeLanguage, tWorkList, tEducationList } = useTranslations();
  const { theme, toggleTheme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [expandedWork, setExpandedWork] = useState<Set<number>>(new Set());
  const [expandedEducation, setExpandedEducation] = useState<Set<number>>(new Set());

  function toggleWork(id: number) {
    setExpandedWork(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  function toggleEducation(id: number) {
    setExpandedEducation(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsVisible(true); 
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    changeLanguage(lang);
  }, [lang, changeLanguage]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="font-nunito">
      <nav className="fixed top-0 w-full bg-background md:bg-transparent z-50">
        <div className="flex justify-between mx-auto">
          <div className="fixed left-0 top-6 items-center justify-center px-2 border-none">
            <Link 
              className={`text-md sm:text-2xl font-bold bg-background rounded-md py-2 px-4 text-light-purple`}
              href={`#home`}
            >
            {'{'} A S {'}'}
            </Link>
          </div>
          <div className="flex-1"></div>

          <ul className="right-0 hidden md:flex flex-row items-center justify-center space-x-10 my-4 mx-2 border-2 rounded-md px-4 bg-menu border-none" >
            <li className="m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer">
              <Link href={`#home`}>{t('menu-home')}</Link>
            </li>
            <li className="m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer">
              <Link href={`#skills`}>{t('menu-skills')}</Link>
            </li>
            <li className="m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer">
              <Link href={`#journey`}>{t('menu-journey')}</Link>
            </li>
            {/* <li className="m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer">
              <Link href={`#projects`}>{t('menu-projects')}</Link>
            </li> */}
            <li className="m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer">
              <Link href={`#contact`}>{t('menu-contact')}</Link>
            </li>
          </ul>

          <ul className="right-0 flex flex-row items-center justify-center space-x-10 my-4 mx-2 border-2 rounded-md px-2 bg-menu border-none" >
            <li className={`m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer ${language === 'en' ? 'bg-background' : ''}`}>
              <Link href="/en">EN</Link>
            </li>
            <li className={`m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer ${language === 'pt' ? 'bg-background' : ''}`}>
              <Link href="/pt">PT</Link>
            </li>
          </ul>

          <div className="right-0 flex flex-row items-center justify-center space-x-10 my-4 mx-2 border-2 rounded-md bg-menu border-none" onClick={toggleTheme}>
            <div className={`m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer`}>
                {
                    theme === "dark" ?
                    <FaSun className="text-yellow-500" />:
                    <BsFillMoonStarsFill  className="" />
                }
            </div>
          </div>

          <div className="md:hidden right-0 flex flex-row items-center justify-center space-x-10 my-4 mx-2 border-2 rounded-md bg-menu border-none z-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`m-1 rounded-md py-2 px-4 font-bold text-sm hover:bg-background cursor-pointer space-y-1 `}>
              <IoIosMenu />
            </div>
          </div>

          <ul className={`md:hidden space-y-10 w-full border-2 rounded-md px-4 bg-menu border-none absolute top-0 right-0 text-center py-15 z-100 ${isMenuOpen ? 'block' : 'hidden'} `} >
            <li className="m-1 rounded-md p-4 font-bold text-sm hover:bg-background cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <Link href={`#home`}>{t('menu-home')}</Link>
            </li>
            <li className="m-1 rounded-md p-4 font-bold text-sm hover:bg-background cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <Link href={`#skills`}>{t('menu-skills')}</Link>
            </li>
            <li className="m-1 rounded-md p-4 font-bold text-sm hover:bg-background cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <Link href={`#journey`}>{t('menu-journey')}</Link>
            </li>
            {/* <li className="m-1 rounded-md p-4 font-bold text-sm hover:bg-background cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <Link href={`#projects`}>{t('menu-projects')}</Link>
            </li> */}
            <li className="m-1 rounded-md p-4 font-bold text-sm hover:bg-background cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <Link href={`#contact`}>{t('menu-contact')}</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mx-auto px-10 max-w-[1080px]">
        <header id="home" className="pt-20 md:pt-0 flex justify-center items-center">
          <div className="flex flex-col w-full max-w-300 min-h-screen md:flex-row md:justify-center items-center">
            <div className="flex flex-col md:flex-1 mb-10 md:mb-0 space-y-5 mx-4">
              <h2 className="text-4xl font-bold">{t('hello')}</h2>
              <h1 className="text-5xl font-bold">{t('name')}</h1>
              <p className="text-lg font-bold">{t('description')}</p>
              <div className="flex flex-row space-x-5 justify-center items-center mx-4">
                <hr className="mr-4 hidden grow self-center border-t border-foreground/25 sm:block" />
                <Link href="https://www.linkedin.com/in/andrefmsouza/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin  className="text-5xl"/>
                </Link>
                <Link href="https://github.com/andrefmsouza" target="_blank" rel="noopener noreferrer">
                  <FaGithub  className="text-5xl"/>
                </Link>
              </div>
            </div>
            <div className="md:flex-1 flex justify-center items-center animate-avatar">
              <Image 
                className="w-auto max-h-100 avatar"
                src="/images/avatar.png"
                alt="André Souza"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </header>
      </div>

      <div className="container mx-auto px-10 max-w-[960px]">
        <section id="skills">
          <div className="flex flex-col w-full pt-50 sm:pt-30">
            <h1 className="text-4xl font-bold">{t('skills')}</h1>
            <p className="text-lg my-5 font-bold">{t('skills-description')}</p>
            <div className="mt-10">
              <SkillsBubbles dragHint={t('skills-drag-hint')} />
            </div>
          </div>
        </section>
        
        <section id="journey">
          <div className="flex flex-col w-full pt-50 sm:pt-30">
            <h1 className="text-4xl font-bold">{t('journey')}</h1>
            <p className="text-lg my-5 font-bold">{t('journey-description')}</p>

            <hr className="my-10" />

            <h2 className="text-2xl font-bold mb-10">{t('work-experience')}</h2>

            <ul className="flex flex-col gap-8">
              {
                tWorkList('work-experience-list').map((item) => (
                  <li key={item.id}>
                    <div style={{ transform: 'translateY(0px) scale(1)', opacity: 1 }} className="will-change-transform grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1px_1fr]">
                      <div className="order-3 shrink-0 pb-3 pl-6 md:sticky md:top-4 md:order-1 md:row-span-2 md:w-44 md:self-start md:pr-3 md:pb-0 md:pl-0">
                        <p className="mr-1 block hover:underline md:mr-0 md:mb-1 md:block md:font-bold md:after:hidden">
                          {item.company}
                        </p>
                        <p className="inline-block text-sm leading-tight after:mx-2 after:not-italic after:content-['|'] max-md:italic md:mr-0 md:block md:after:hidden ">
                          {item.period}
                        </p>
                      </div>
                      <span className="relative order-1 row-span-3 block w-px shrink-0 md:order-2 md:row-span-2">
                        <span className="absolute left-0 block w-px bg-foreground/15 top-2.5 -bottom-8"></span>
                        <span className="bg-light-purple absolute top-2.5 -left-1 block size-2 rounded-full"></span>
                      </span>
                      <h4 className="text-md order-2 pl-6 font-bold text-pretty md:order-3 md:mb-2 md:text-lg md:font-semibold">
                        {item.role}
                      </h4>
                      <div className="order-3 grow pl-6">
                        <button
                          onClick={() => toggleWork(item.id)}
                          className="text-sm font-semibold text-light-purple hover:underline mb-3 cursor-pointer"
                        >
                          {expandedWork.has(item.id) ? t('read-less') : t('read-more')}
                        </button>
                        {expandedWork.has(item.id) && (
                          <ul className="dark:text-content-dark text-content-light list-disc pl-4 text-sm text-pretty sm:text-base">
                            {item.description.map((activity: string) => (
                              <li key={activity}>{activity}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>

            <hr className="my-20" />

            <h2 className="text-2xl font-bold mb-10">{t('education')}</h2>

            <ul className="flex flex-col gap-8">
              {
                tEducationList('education-list').map((item) => (
                  <li key={item.id}>
                    <div style={{ transform: 'translateY(0px) scale(1)', opacity: 1 }} className="will-change-transform grid grid-cols-[auto_1fr] md:grid-cols-[10rem_1px_1fr]">
                      <div className="order-3 shrink-0 pb-3 pl-6 md:sticky md:top-4 md:order-1 md:row-span-2 md:w-44 md:self-start md:pr-3 md:pb-0 md:pl-0">
                        <p className="mr-1 block hover:underline md:mr-0 md:mb-1 md:block md:font-bold md:after:hidden">
                          {item.school}
                        </p>
                        <p className="inline-block text-sm leading-tight after:mx-2 after:not-italic after:content-['|'] max-md:italic md:mr-0 md:block md:after:hidden ">
                          {item.period}
                        </p>
                      </div>
                      <span className="relative order-1 row-span-3 block w-px shrink-0 md:order-2 md:row-span-2">
                        <span className="absolute left-0 block w-px bg-foreground/15 top-2.5 -bottom-8"></span>
                        <span className="bg-light-purple absolute top-2.5 -left-1 block size-2 rounded-full"></span>
                      </span>
                      <h4 className="text-md order-2 pl-6 font-bold text-pretty md:order-3 md:mb-2 md:text-lg md:font-semibold">
                        {item.course}
                      </h4>
                      <div className="order-3 grow pl-6">
                        {item.description.length > 0 && (
                          <button
                            onClick={() => toggleEducation(item.id)}
                            className="text-sm font-semibold text-light-purple hover:underline mb-3 cursor-pointer"
                          >
                            {expandedEducation.has(item.id) ? t('read-less') : t('read-more')}
                          </button>
                        )}
                        {expandedEducation.has(item.id) && (
                          <ul className="dark:text-content-dark text-content-light list-disc pl-4 text-sm text-pretty sm:text-base">
                            {item.description.map((activity: string) => (
                              <li key={activity}>{activity}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </section>

        {/* <section id="projects">
          <div className="flex flex-row w-full min-h-screen justify-center items-center"></div>
        </section> */}
        
        <section id="contact">
          <div className="flex flex-col pt-50 sm:pt-30 pb-50 w-full max-w-300 md:flex-row md:justify-center items-center">
            <div className="flex flex-col md:flex-1 mb-10 md:mb-0 space-y-5 mx-4">
              <h2 className="text-5xl font-bold">{t('contact')}</h2>
              <p className="text-lg my-20 ms-0 md:ml-20" dangerouslySetInnerHTML={{ __html: t('contact-description') }}></p>
              <div className="flex flex-row space-x-5 justify-center items-center mx-4">
                <Link href="https://www.linkedin.com/in/andrefmsouza/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin  className="text-5xl"/>
                </Link>
                <Link href="https://github.com/andrefmsouza" target="_blank" rel="noopener noreferrer">
                  <FaGithub  className="text-5xl"/>
                </Link>
                <hr className="mr-4 hidden grow self-center border-t border-foreground/25 sm:block" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={`bottom-0 right-0 fixed flex flex-row items-center justify-center space-10 m-4 w-12 h-12 border-2 rounded-md bg-menu border-none ${isVisible ? 'block' : 'hidden'}`}>
        <Link href="#home" className={`m-1 rounded-md py-2 px-4 font-bold text-sm cursor-pointer`}>
          <FaArrowUp />
        </Link>
      </div>

    </div>
  );
} 