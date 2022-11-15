import Validate from "./validate";
import { SetStateAction, Dispatch } from "react";
import ValidateSeller from "./validateseller";

export type InputState = {
  name: string;
  price_local: number;
  stock: number;
  description: string;
  suspended: "DEFAULT" | "true" | "false";
  image: string;
  cloudinary: any;
  categories: any[];
};

export type InputStateSeller = {
    nombreNegocio: string | null;
    imageLogo: string | null;
    categorias: "Gastronomia" | "Entretenimiento" | "Servicios" | "Tecnologia" | "Vestimenta" | "Educacion" | "No esta especificado"|null;
    template_page: "1"|"2"|"3"|null;
    description: string | null;
    paymentId: string;

}
export type ErrorState = Record<"name"|"price_local"|"stock"|"description"|"suspended"|"image", string>
export type ErrorStateSeller = Record<"nombreNegocio"|"imageLogo"|"categorias"|"description"|"template_page", string>

export const uploadToCloudinary = async (url: string)  => {
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "henryleo");
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/minubeleo/image/upload", //https://api.cloudinary.com/v1_1/:cloud_name/:action
        {
            method: "POST",
            body: data,
        }
    );
    return await res.json()
}

export const upLoadImage =
  (
    input: InputState,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setInput: Dispatch<SetStateAction<InputState>>,
    setErr: Dispatch<SetStateAction<ErrorState>>
  ) =>
  async (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    // imagenes/ es la carpeta de Cloudinary
    setLoading(true);
    const file = await uploadToCloudinary(files[0]);
    setLoading(false);
    setInput({ ...input, [e.target.name]: file.secure_url });
    setErr(Validate({ ...input, [e.target.name]: e.target.value }));
}

export const upLoadImageSeller = (input: InputStateSeller, setLoading: Dispatch<SetStateAction<boolean>>, setInput: Dispatch<SetStateAction<InputStateSeller>>, setErr: Dispatch<SetStateAction<ErrorStateSeller>>) => async (e: any) => {
    e.preventDefault();
    const files = e.target.files;
   // imagenes/ es la carpeta de Cloudinary
    setLoading(true);
    const file = await uploadToCloudinary(files[0]);
    setLoading(false);
    setInput({ ...input, [e.target.name]: file.secure_url });
    setErr(ValidateSeller({ ...input, [e.target.name]: e.target.value }));
}