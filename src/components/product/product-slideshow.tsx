"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { ProductSlideshowProps } from "@/interfaces/product-slideshow-props";
import clsx from "clsx";

export const ProductSlideshow = ({
  autoPlay = undefined,
  images = [],
  className,
  opts = {},
  showArrows = true,
  title = "",
  ...props
}: ProductSlideshowProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [emblaMainApi, setEmblaMainApi] = useState<CarouselApi>();
  const [emblaThumbsApi, setEmblaThumbsApi] = useState<CarouselApi>();

  // Carousel Main
  const [emblaMainRef] = useEmblaCarousel({ ...opts });

  // Carousel Thumbnails
  const [emblaThumbsRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
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
  const onSelect = (index: number) => {
    emblaMainApi?.scrollTo(index);
    emblaThumbsApi?.scrollTo(index);
  };

  return (
    <div
      {...props}
      className={cn("flex flex-col gap-y-4 base-styles# relative", className)}
    >
      {/* Slideshow Principal */}
      <Carousel
        ref={emblaMainRef}
        setApi={setEmblaMainApi}
        opts={opts}
        plugins={autoPlay ? [Autoplay({ delay: autoPlay?.delay })] : []}
        className="overflow-hidden"
      >
        <CarouselContent className="">
          {images.map((image, index) => (
            <CarouselItem
              className={"flex justify-center overflow-hidden"}
              key={image + index}
            >
              <Image
                className="object-cover"
                src={`/products/${image}`}
                alt={title}
                width={500}
                height={500}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && (
          <div className="hidden lg:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )}
      </Carousel>

      {/* DotButtons Carousel (Mobile) */}
      <div className="absolute bottom-1 -translate-x-1/2 left-1/2 flex gap-x-1.5 lg:hidden rounded-l-full rounded-r-full bg-black/30 p-1.5">
        {images.map((dot, index) => {
          const selected = index === selectedIndex;
          return (
            <button
              onClick={() => onSelect(index)}
              className={cn(
                "rounded-full size-2",
                selected
                  ? "bg-white/80"
                  : "border-gray-600/80 bg-neutral-500/80"
              )}
              key={`dot-${dot + index}`}
            />
          );
        })}
      </div>

      {/* Thumbnails Carousel (Desktop) */}
      <Carousel
        ref={emblaThumbsRef}
        setApi={setEmblaThumbsApi}
        className="hidden lg:block overflow-hidden"
      >
        <CarouselContent className="flex justify-start gap-x-2 px-4">
          {images.map((image, index) => {
            const selected: boolean = index === selectedIndex;
            return (
              <CarouselItem
                key={`thumbnail-${image + index}`}
                onClick={() => onSelect(index)}
                className={
                  "flex flex-shrink-0 basis-24 justify-center items-center overflow-hidden px-0 rounded-md"
                }
              >
                <Image
                  src={`/products/${image}`}
                  alt={title}
                  height={100}
                  width={100}
                  className={clsx(
                    "h-24 w-24 object-cover transition rounded-md border-2",
                    selected && "border-cyan-400",
                    !selected && "border-transparent"
                  )}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
