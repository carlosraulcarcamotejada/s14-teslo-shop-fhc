"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(opts);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi?.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const { isDesktop } = useResponsive();

  return (
    <div className="flex flex-col gap-4">
      {/* Slideshow Principal */}
      <Carousel
        ref={emblaMainRef}
        opts={{ ...opts }}
        plugins={autoPlay ? [Autoplay({ delay: autoPlay?.duration })] : []}
        className="border# overflow-hidden rounded-md"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                className="object-cover rounded-md"
                src={`/products/${image}`}
                alt={title}
                width={1100}
                height={800}
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

      {/* Thumbnails */}
      {isDesktop && (
        <div className="flex justify-center gap-2" ref={emblaThumbsRef}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`border-2 rounded-md overflow-hidden transition ${
                selectedIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={`/products/${image}`}
                alt={title}
                width={80}
                height={80}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
