import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";

const LandingPage = () => {
  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        {/* Hero */}
        <section className="text-center">
          <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-7xl tracking-tighter py-3">
            Find Your Dream Job{" "}
            <span className="flex items-center gap-3 sm:gap-6">
              at{""}
              <img
                src="/logo.png"
                alt="LinkUP"
                className="h-5 sm:h-15 lg:h-25"
              />
            </span>
          </h1>
          <p className="to-gray-300 sm:mt-4 text-xs sm:text-xl ">
            Explore millions of job listings of find the perfect candidate
          </p>
        </section>
        {/* buttons */}
        <div className="flex gap-6 justify-center">
          <Link to="/jobs">
            <Button variant={"blue"} size={"xl"} className="px-15">
              Find Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant={"destructive"} size={"xl"} className="px-15">
              Post a Job
            </Button>
          </Link>
        </div>
        {/* carousel */}

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-6 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* <CarouselPrevious /> */}
          {/* <CarouselNext /> */}
        </Carousel>

        {/* banner */}
        <img src="/banner.jpg" className="h-180" />

        {/* card */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Search and apply for jobs, track applications and more.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Post jobs, manage applications, and find the best candidates.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}

        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </>
  );
};

export default LandingPage;
