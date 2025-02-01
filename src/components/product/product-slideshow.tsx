"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useResponsive } from "@/hooks/use-responsive";

interface ProductSlideshowProps {
  autoPlay?: { duration: number };
  images?: string[];
  opts?: Partial<EmblaOptionsType>;
  showArrows?: boolean;
  title?: string;
}

export const ProductSlideshow = ({
  autoPlay = undefined,
  images = [],
  opts = {},
  showArrows = true,
  title = "",
}: ProductSlideshowProps) => {
  const { isDesktop } = useResponsive();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
  const [emblaThumbsApi, setEmblaThumbsApi] = useState<CarouselApi>();

  // Carousel Main
  const [emblaMainRef] = useEmblaCarousel({ ...opts });

  // Carousel Thumbnails
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "center",
  });

  // Sync Thumbnails and Main Carousel
  useEffect(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    emblaMainApi.on("select", () => {
      setSelectedIndex(emblaMainApi?.selectedScrollSnap());
    });

    emblaThumbsApi?.on("select", () => {
      emblaMainApi?.scrollTo(emblaThumbsApi?.selectedScrollSnap());
    });
  }, [emblaMainApi, emblaThumbsApi]);

  // Thumbnail Click Handler
  const onThumbClick = (index: number) => {
    emblaMainApi?.scrollTo(index);
    emblaThumbsApi?.scrollTo(index);
  };

  return (
    <div className="flex flex-col gap-y-4">
      {/* Slideshow Principal */}
      <Carousel
        ref={emblaMainRef}
        setApi={setEmblaMainApi}
        opts={opts}
        plugins={autoPlay ? [Autoplay({ delay: autoPlay?.duration })] : []}
        className="border# overflow-hidden rounded-md"
      >
        <CarouselContent className="">
          {images.map((image, index) => (
            <CarouselItem className="flex justify-center" key={image + index}>
              <Image
                className="object-cover rounded-md"
                src={`/products/${image}`}
                alt={title}
                width={500}
                height={500}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && isDesktop && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* Thumbnails Carousel */}
      {isDesktop && (
        <Carousel
          ref={emblaThumbsRef}
          setApi={setEmblaThumbsApi}
          className="overflow-hidden rounded-md bg-red-600@"
        >
          <CarouselContent className="flex justify-center gap-x-4 px-0 rounded-md bg-green-500@">
            {images.map((image, index) => {
              const selected: boolean = index === selectedIndex;
              return (
                <CarouselItem
                  key={image + index}
                  onClick={() => onThumbClick(index)}
                  className={`flex flex-shrink-0@ basis-24 justify-center items-center overflow-hidden px-0 rounded-md bg-sky-500@
                   ${selected ? "border border-gray-500" : ""}
                   `}
                >
                  <Image
                    src={`/products/${image}`}
                    alt={title}
                    height={100}
                    width={100}
                    className={`h-24 w-24 object-cover  bg-black@ transition hover:brightness-50
                      ${selected ? "brightness-50" : ""}`}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};
