# Contact List App – React Native

Aplicación móvil en React Native que muestra una lista de contactos con búsqueda en tiempo real, consumo de API REST y manejo de estados de carga y error.

---

## Tecnologías y librerías utilizadas

- **React Native**
- **React Hooks** – `useState`, `useEffect`, `useMemo`, `useCallback`
- **Axios** – cliente HTTP para consumo de API
- **react-native-safe-area-context** – manejo de áreas seguras en dispositivos móviles

---

## Estructura del proyecto

```
src/
├── hooks/
│   └── useContactListHooks.js   # Custom hook: fetch, debounce y filtrado
├── screens/
│   └── ContactListScreen.js     # Pantalla principal con FlatList
├── services/
│   └── BaseApi.js               # Configuración de Axios e instancia base
└── mock/
    └── contact-response.json    # Mock data local
```

---

## Arquitectura y decisiones técnicas

### `BaseApi.js`
- Instancia centralizada de Axios con `baseURL`, `timeout` de 5 segundos y headers por defecto.
- El endpoint `getContact()` consume `/posts` de [JSONPlaceholder](https://jsonplaceholder.typicode.com) como mock de contactos.
- Diseño extensible para agregar interceptores de autenticación o manejo global de errores.

### `useContactListHooks.js` – Custom Hook
- Maneja todo el estado de la pantalla: lista de contactos, carga, error y búsqueda.
- **Debounce implementado manualmente** con `useEffect` + `setTimeout` (500ms), sin dependencias externas. Separa `search` (valor del input) de `debounceSearch` (valor que dispara el filtro real).
- **`useMemo`** para el filtrado de contactos: solo recalcula cuando cambia la lista o el término de búsqueda.
- **`useCallback`** en `fetchContact` para estabilizar la referencia de la función entre renders.

### `ContactListScreen.js`
- Usa `FlatList` con propiedades de optimización: `windowSize={5}`, `initialNumToRender={10}`, `maxToRenderPerBatch={10}` para listas de gran tamaño.
- `ListFooterComponent` muestra un `ActivityIndicator` únicamente mientras se cargan datos.
- `ListEmptyComponent` para el estado sin resultados.
- Manejo de error con mensaje al usuario cuando falla la llamada al servicio.
- `TextInput` conectado al hook para filtrar contactos en tiempo real con debounce.

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

---

## API utilizada

**JSONPlaceholder** – `https://jsonplaceholder.typicode.com/posts`  
API pública gratuita utilizada como mock de datos de contactos durante el desarrollo.
