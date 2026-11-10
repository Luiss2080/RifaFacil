<div align="center">

<img src="docs/assets/logo.svg" alt="RifaFácil" width="96" height="96">

# RifaFácil

**Rifas y polladas sin papel: números vendidos, pagos, vendedores y sorteo aleatorio.** Pensado para colegios, clubes y juntas vecinales, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Rifas con premio, precio por número y fecha de sorteo.
- Grilla de números: libre, reservado o pagado.
- Vendedores con su cuenta de lo vendido y lo rendido.
- Lista de deudores con aviso por WhatsApp.
- Sorteo aleatorio entre los números pagados.
- Reporte de recaudación en PDF.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| PDF | Generación de PDF (expo-print) |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `rifas` (id, nombre, premio, precio_numero, total_numeros, fecha_sorteo)
- `vendedores` (id, nombre, telefono)
- `numeros` (id, rifa_id, numero, comprador, telefono, vendedor_id, estado, fecha_pago)
- `sorteos` (id, rifa_id, numero_ganador, fecha)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Rifas y grilla de números
3. Vendedores y rendiciones
4. Deudores y avisos
5. Sorteo y reporte

## 📂 Estructura

```
RifaFacil/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/RifaFacil.git
cd RifaFacil
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
