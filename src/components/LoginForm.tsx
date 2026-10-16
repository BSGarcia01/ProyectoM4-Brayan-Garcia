
import type { DatosLogin } from "../types/Auth";

interface LoginFormProps {
  onSubmit: (datos: DatosLogin) => Promise<void>;
}