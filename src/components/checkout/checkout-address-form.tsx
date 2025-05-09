"use client";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Address } from "@/interfaces/shared/address";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SaveIcon, XIcon } from "lucide-react";
import { useAddress } from "@/hooks/use-address";
import { deleteUserAddress } from "@/actions/address/delete-user-address";
import { addressFormSchema } from "@/schema/address-form-schema";
import { CheckoutAddressProps } from "@/interfaces/checkout/checkout-address-form";
import { cn } from "@/lib/utils";
import { getUserAddress } from "@/actions/address/get-user-address";
import { createUserAddress } from "@/actions/address/create-user-address";
import { updateUserAddress } from "@/actions/address/update-user-address";
import { checkAddressValues } from "@/data/check-address-values";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const CheckoutAddressForm = ({
  countries,
  className,
  userStoredAddress,
  userId,
  ...props
}: CheckoutAddressProps) => {
  const router = useRouter();
  const { address, setCheckoutAddress } = useAddress();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your default values.
  const defaultCheckoutAddressValues: Address = userStoredAddress
    ? userStoredAddress
    : !userStoredAddress && address
    ? address
    : checkAddressValues;

  // 2. Define your form.
  const form = useForm<Address>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: defaultCheckoutAddressValues,
  });

  const isDirty: boolean = !form.formState.isDirty;
  const isValid: boolean = !form.formState.isValid;

  // Para que isDirty se restablezca
  useEffect(() => {
    if (userStoredAddress) {
      form.reset(userStoredAddress);
    }
  }, [userStoredAddress]);

  // 3. Define a submit handler.
  const onSubmit = async (values: Address) => {
    setIsLoading(true);
    setCheckoutAddress(values);

    if (isDirty) {
      router.push("/checkout");
      return;
    }

    const { userAddressFound } = await getUserAddress({ userId });
    let message: string = "";
    if (!userAddressFound) {
      const { message: messageResp } = await createUserAddress({
        address: values,
        userId,
      });
      message = messageResp;
    } else if (userAddressFound) {
      const { message: messageResp } = await updateUserAddress({
        address: values,
        userId,
      });
      message = messageResp;
    }

    if (!values.saveForm) {
      const { message: messageResp } = await deleteUserAddress({ userId });
      message = messageResp;
    }

    toast(message, {
      action: {
        label: <XIcon className="w-4 h-4" />,
        onClick: () => {
          toast.dismiss();
        },
      },
    });

    setIsLoading(true);
    router.push("/checkout");
  };

  return (
    <div className={cn("", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 mt-8">
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nombres"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Apellidos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Dirección"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección 2 (opcional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Dirección 2 (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código postal</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Código postal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Ciudad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccine un país" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="mobilePhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Teléfono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveForm"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0 p-2 border# rounded-md my-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      disabled={isLoading}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>¿Recordar dirección?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full lg:w-1/3 mt-4"
            )}
            type="submit"
            disabled={isValid || isLoading}
          >
            <SaveIcon />
            Siguiente
          </Button>
        </form>
      </Form>
    </div>
  );
};
