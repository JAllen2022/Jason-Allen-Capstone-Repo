export default function Arrow({ classString, onClick }) {
  return (
    <svg
      width="700pt"
      height="700pt"
      version="1.1"
      viewBox="0 0 700 700"
      onClick={onClick}
      className={classString}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <symbol id="w" overflow="visible">
          <path d="m0.03125 0h-0.03125v-0.015625-0.015625c0.0078125-0.0078125 0.019531-0.015625 0.03125-0.015625v0.015625h-0.015625v0.015625 0.015625h0.015625v-0.015625z" />
        </symbol>
        <symbol id="b" overflow="visible">
          <path d="m0.03125-0.015625h-0.015625v0.015625h-0.015625v-0.03125h0.015625 0.015625z" />
        </symbol>
        <symbol id="a" overflow="visible">
          <path d="m0.03125-0.015625h-0.015625v0.015625c0.0078125 0 0.015625-0.0039062 0.015625-0.015625v0.015625h-0.015625-0.015625v-0.015625l0.015625-0.015625c0.0078125 0 0.015625 0.0078125 0.015625 0.015625zm0 0h-0.015625v-0.015625 0.015625z" />
        </symbol>
        <symbol id="e" overflow="visible">
          <path d="m0.015625-0.015625v0.015625-0.015625zm0.015625 0v0.015625h-0.015625-0.015625v-0.015625h0.015625v-0.015625l-0.015625 0.015625v-0.015625h0.015625 0.015625v0.015625z" />
        </symbol>
        <symbol id="c" overflow="visible">
          <path d="m0.015625-0.03125h0.015625v0.015625h-0.015625v0.015625h0.015625-0.015625-0.015625v-0.015625-0.015625z" />
        </symbol>
        <symbol id="k" overflow="visible">
          <path d="m0.03125-0.03125v-0.015625 0.046875h-0.015625-0.015625v-0.015625l0.015625-0.015625h0.015625zm-0.015625 0.03125 0.015625-0.015625h-0.015625v-0.015625 0.015625 0.015625z" />
        </symbol>
        <symbol id="j" overflow="visible">
          <path d="m0.015625 0h0.015625v-0.015625c0-0.0078125-0.0078125-0.015625-0.015625-0.015625v0.015625 0.015625zm0-0.03125h0.015625v0.015625 0.015625h-0.015625-0.015625v-0.046875h0.015625z" />
        </symbol>
        <symbol id="i" overflow="visible">
          <path d="m0-0.03125h0.015625v0.015625l0.015625-0.015625-0.015625 0.03125v0.015625h-0.015625v-0.015625h0.015625z" />
        </symbol>
        <symbol id="h" overflow="visible">
          <path d="m0.03125 0h-0.03125l0.015625-0.046875h0.015625l0.015625 0.046875zm-0.015625-0.015625h0.015625l-0.015625-0.015625z" />
        </symbol>
        <symbol id="v" overflow="visible">
          <path d="m0-0.046875h0.015625v0.046875h-0.015625z" />
        </symbol>
        <symbol id="u" overflow="visible">
          <path d="m0.015625-0.015625-0.015625-0.015625h0.015625v0.015625l0.015625-0.015625-0.015625 0.015625 0.015625 0.015625-0.015625-0.015625v0.015625h-0.015625z" />
        </symbol>
        <symbol id="t" overflow="visible">
          <path d="m0-0.046875h0.015625l0.015625 0.03125v-0.03125h0.015625v0.046875-0.03125l-0.015625 0.03125-0.015625-0.03125v0.03125h-0.015625z" />
        </symbol>
        <symbol id="g" overflow="visible">
          <path d="m0-0.015625v-0.015625h0.015625v0.015625 0.015625l0.015625-0.015625v-0.015625 0.03125h-0.015625-0.015625v-0.015625z" />
        </symbol>
        <symbol id="f" overflow="visible">
          <path d="m0-0.03125h0.015625v0.015625l0.015625-0.015625-0.015625 0.03125z" />
        </symbol>
        <symbol id="s" overflow="visible">
          <path d="m0.03125-0.046875v0.015625h-0.015625 0.015625v0.015625h-0.015625v0.015625h-0.015625v-0.03125l0.015625-0.015625z" />
        </symbol>
        <symbol id="d" overflow="visible">
          <path d="m0.015625-0.03125v0.015625 0.015625l0.015625-0.015625h-0.015625v-0.015625zm0 0c0.0078125 0 0.015625 0.0078125 0.015625 0.015625v0.015625h-0.015625-0.015625v-0.015625l0.015625-0.015625z" />
        </symbol>
        <symbol id="r" overflow="visible">
          <path d="m0.03125-0.03125h0.015625v0.015625 0.015625-0.015625h-0.015625v0.015625-0.015625h-0.015625v0.015625h-0.015625v-0.03125h0.015625 0.015625z" />
        </symbol>
        <symbol id="q" overflow="visible">
          <path d="m0.03125-0.015625v0.015625-0.015625h-0.015625v0.015625h-0.015625v-0.046875h0.015625v0.015625h0.015625v0.015625z" />
        </symbol>
        <symbol id="p" overflow="visible">
          <path d="m0-0.046875h0.015625l0.015625 0.03125v-0.03125h0.015625v0.046875h-0.015625l-0.015625-0.03125v0.03125h-0.015625z" />
        </symbol>
        <symbol id="o" overflow="visible">
          <path d="m0.03125-0.015625v0.015625-0.015625h-0.015625v0.015625h-0.015625v-0.03125h0.015625 0.015625v0.015625z" />
        </symbol>
        <symbol id="n" overflow="visible">
          <path d="m0-0.046875h0.015625c0.0078125 0 0.015625 0.0078125 0.015625 0.015625v0.015625h-0.015625v0.015625h-0.015625zm0.015625 0.015625v0.015625h0.015625v-0.015625h-0.015625z" />
        </symbol>
        <symbol id="m" overflow="visible">
          <path d="m0-0.03125h0.015625v0.03125c0 0.0078125-0.0078125 0.015625-0.015625 0.015625zm0-0.015625h0.015625v0.015625h-0.015625z" />
        </symbol>
        <symbol id="l" overflow="visible">
          <path d="m0.03125-0.03125v0.015625h-0.015625v-0.015625 0.015625 0.015625c0.0078125 0 0.015625-0.0039062 0.015625-0.015625v0.015625h-0.015625-0.015625v-0.015625l0.015625-0.015625h0.015625z" />
        </symbol>
      </defs>
      <g>
        <path
          d="m190.92 302.52c-4.1797-13.969 7.5859-13.285 24.836-33.953 1.9844-2.3906 3.207-4.3438 5.0938-6.2852l39.254-46.059c2.8008-3.957 2.4688-2.2812 4.0898-5.4336l-72.215 62.426c-4.5078 4.6172-6.9688 7.1094-11.344 11.344-4.543 4.3867-6.3281 9.5703-14.387 10.945-0.28516-10.328 1.8945-9.3828 6.7148-14.762 10.316-11.52 22.258-22.52 31.395-35.09l-40.27 33.777c-4.7305 5.0938-1.8516 3.0742-7.0898 4.2109-5.4219-12.578 7.8477-10.141 16.941-30.59-11.75 0.61719-9.7227 5.1484-20.414 8.5664 0.10937 0.28516 0.76172 0.66016 0.50781 0.77344-5.6211 2.4141 0.94922 1.4766 1.1367 1.8867l1.5664 4.6289c-4.9258 2.7773-3.8242 2.2148-8.6328 6.1523-9.8438 8.0586-17.141 3.5508-5.2148-7.4297 4.0664-3.7461 7.6953-7.8828 9.9336-10.473-9.4023 1.1445-23.215 7.0898-28.715 13.305 2.7461 4.4766 27.02 21.949 33.359 26.094 6.9688 4.5625 11.078 7.5391 17.891 12.434 5.8086 4.168 12.832 8.4766 17.648 12.48l19.246-24.23c7.0234-8.5312 13.703-14.309 20.855-22.664 4.1445-4.8398 37.074-41.348 39.234-47.234l-19.676 17.625c-4.3867 4.7852-3.5156 4.8516-9.3711 9.4805-1.4219 1.125-4.3438 3.3398-5.3594 4.2539zm172.7-32.18 9.3477-10.66c-3.4492 3.1953-7.0898 5.7773-9.3477 10.66zm32.344 180.86c0.39844-10.188 1.4102-18.918 2.0078-29.145 0.85938-14.961 5.3242-17.383 1.6328-23.105l-25.938 38.328c5.4883 5.6211 13.527 11.398 22.301 13.922zm-13.25-51.293c5.6562-3.2852 8.6992-7.1875 12.543-12.5 2.9648-4.0781 8.0352-6.5586 7.8828-14.32-4.2656 2.0391-18.531 23.27-20.426 26.82zm77.816-46.465c8.707-14.816 32.41-35.043 35.652-46.035-7.1992 2.3828-6.1055 3.1875-14.496 10.879l-33.688 34.516 12.535 0.64062zm30.602-4.9062c0.17578-0.42969 0.28516-0.98047 0.46484-1.4102 1.8281-4.3203 0.57422-2.0156 3.3828-5.9102 2.625-3.6172 4.5859-5.3906 7.8594-9.3047 5.4453-6.4727 11.199-12.797 14.938-19.887-6.1641 2.293-18.938 16.184-24.871 21.418l-22.52 19.227c0.30859 0.14453-0.59375 0.66016-0.87109 1.3125l19.172-0.042969zm25.168 6.3164c2.2266-22.047 26.977-32.234 26.48-44.184-1.9844 1.4336-3.1289 2.2812-5.8984 4.1992-1.7969 1.2578-1.8086 1.0898-3.5039 2.4258l-13.68 14.496c-9.1367 9.2812-18.355 13.461-23.039 21.883l19.645 1.1797zm21.133 0.40625c-5.1055-10.934 3.9453-10.383 5.6328-19.621-4.7734 4.543-15.223 10.207-18.906 18.234 0.45312 0.23047 1.0039 0.58594 1.3555 0.69531l11.918 0.69531zm-8.8398-86.59c2.4375-2.5117 5.6211-4.9727 7.0117-7.9805l16.559-25.367c5.1797-5.9102 9.2695-11.676 12.07-18.652l-20.184 2.8789c-0.21875 0.51953-0.90234 2.457-1.1133 3.0195-0.77344 2.0156-0.83594 2.6445-2.0625 5.3906l-6.2852-2.2148c-8.2578 1.5195-45.242 38.141-46.598 38.781l-4.5547-7.1641c-6.5586 10.691-20.57 25.496-26.5 34.48-3.9336 5.9648-8.1445 11.113-12.789 17.484l-8.4648 10.316c-0.30859 0.46484-1.1133 2.0156-1.3555 2.5117-3.1094 6.1836-2.25 6.9688 1.6406 10.066-8.168 6.0859-15.457 11.234-18.332 21.793l18.641 0.042969c1.8867-5.6758 20.637-29.633 25.309-34.934 6.6797-7.5859 20.969-23.008 25.453-34.164l-31.473 26.742c-0.42969 0.36328-1.6094 1.5664-2.0078 1.8398-2.2148 1.543-1.0039 1.3906-4.1133 1.1367l37.559-36.398c6.8672-6.7891 12.082-12.512 18.629-19.281 16.867-17.438 7.3516-17.684 18.828-18.496 0.15625 0.61719 1.1016 3.9336 1.0039 5.2461-0.29688 3.7383-0.39844 2.5898-1.5547 4.375-2.3477 3.5938 0.57422-0.88281-3.1875 2.7891-22.445 21.938-34.527 40.191-52.098 63.883-4.9375 6.6602-16.336 17.219-17.848 25.277l77.805-73.406zm32.066 66.164-20.285 20.602 7.0664 0.15625c0.24219-0.35156 0.5625-0.87109 0.69531-1.1016l5.668-9.457c2.6133-3.9336 4.4531-5.9414 6.8555-10.195zm0 0 4.7852-6.8438zm19.004-32.145c-7.5742 3.6172-22.512 21.871-26.004 28.164 6.6016-4.9062 22.18-20.492 26.004-28.164zm0 0 7.9375-2.4375c0.26562 10.812-14.473 25.477-25.785 43.379 5.3789-2.5898 16.656-13.988 21.453-20.293 10.527-13.844 10.746-7.4414 11.883-30.117 0.65234-13.008-1.8516-68.602-4.8633-77.176l-14.418-0.48438c-5.1133 4.9375-7.043 10.309-12.312 16.051-23.934 26.105-5.293 15.102-15.953 27.668l-71.168 81.488c12.422-4.5625 42.652-35.684 52.043-45.516 9.3242-9.7656 17.34-16.48 25-24.438 13.328-13.801 14.715-22.719 22.258-24.945 4.3438 10.031-6.9766 18.562-13.02 24.703l-38.352 41.285c-5.4805 7.6172-14 14.805-17 22.5 11.367-2.3047 29.586-25.949 39.211-34.406 6.6797-5.8633 11.43-9.2812 18.863-17.164 8.2773-8.7852 11.773-15.555 19.246-15.422 1.0703 11.598-40.469 38.98-54.246 71.422 10.582-6.6484 21.012-18.047 28.605-26.414 12.258-13.504 19.723-27.117 26.566-28.453 3.1641 8.6328-3.2305 11.75-5.9531 18.773zm-21.949 54.039c11.035 0.5625 24.055 2.9766 35.219 0.25391l-0.51953-30.723c-4.1133 4.6758-16.559 20.504-18.906 25.234-2.0742-4.75-0.48438-4.8281 2.0273-9.0391-6.0742 2.0625-15.828 8.8633-17.824 14.277zm-197.71 23.578c-4.6289 13.074-17.109 21.781-21.539 35.332 8.5859 5.9961 18.719 11.387 27.02 16.578 7.3203-4.2227 11.992-11.707 15.688-18.199-7.8711 2.8203-7.8594 6.7578-11.906 2.5898-6.8125-7.0117 6.0078-17.551 9.3477-21.164l23.336-29.633c2.9531-5.5352 2.3477-7.5859 5.8438-11.344 6.1289-6.5938 5.832-2.2695 7.2656-12.855-11.441 5.9648-22.023 22.566-39.906 34.582l52.055-55.602c19.742-12.281 22.707-26.27 36.742-42.672 9.0742-10.594 19.113-25.598 24.285-39.871l-10.285 4.1562c3.6836-5.1055 8.9727-9.293 13.426-12.688l11.301-7.4414c12.621-2.1172 2.0938 13.492-0.62891 19.445 7-0.32031 25.871-17.438 31.746-23.383 0.28516-0.28516 0.73828-0.84766 1.1016-1.2773-22.398-0.67188-42.641-2.6328-64.973-0.58594-20.141 1.8516-40.523 5.8633-60.852 5.9961l-74.629 92.953c-8.0352 10.375-16.039 18.156-23.051 32.289 14.781-7.9609 26.113-27.492 39.156-32.145-4.2891 8.3789-33.113 35.508-43.664 44.492-10.504 8.9531-11.078-2.2148-4.6641-10.516 3.9141-5.0703 5.1484-6.8125 9.4141-11.496l18.059-21.672c6.7344-8.4453 29.906-35.406 33.93-45.836-12.723 5.3906-37.359 35.938-46.738 44.391-10.684 9.625-34.117 40.191-46.332 44.316-7.0898-7.9258 4.2344-17.484 9.5586-24.219 10.188-12.898 51.68-64.18 55.461-77.211-7.332 3.3945-8.6641 9.5703-14.828 13.746 2.9219-11.961 46.242-49.969 57.223-68.082 8.125-13.414 17.902-5.1484 8.6523 4.8633-13.117 14.199-25 27.25-36.277 43.398-5.1797 7.418-8.7852 11.617-13.957 18.242-13.594 17.43-47.113 58.844-54.59 72.445 15.023-5.7969 72.117-71.344 86.645-85.754l27.559-31.527c-6.2266-11.301 1.7656-40.336-2.6328-56.121l-83.582 97.129c-10.625 12.59-46.984 50.035-50.156 60.762 10.043-7.3516 15.84-15.586 27.316-23.953-2.3594 9.1953-22.203 24.473-28.961 32.664-3.5508 4.3203-6.625 8.2344-13.273 8.5312-1.2344-14.398 32.465-44.887 41.844-57.641 12.191-16.547 20.648-22.773 30.656-35.707 3.4609-4.4648 2.668-5.6328 6.7695-10.352l24.582-26.535c5.7305-6.4805 11.355-11.762 15.035-19.723-10.098 6.4258-18.84 17.262-27.879 25.785l-16.879 16.016c0.47266-6.5352 2.7109-5.4453 7.3516-10.242l69.648-75.668c-0.96875-6.9766-4.8711-13.594-3.9688-23.547l3.1406-8.2227c2.5586-6.4922 1.0234-6.7461 4.9492-11.926 8.0039 14.285 4.7188 33.711 4.3086 50.5-0.44141 18.707-1.3438 38.219-0.03125 56.109 23.656-11.309 137.02-0.99219 176.7-5.6328 12.941-1.5117 11.598-5.0391 21.133 0.71484l-2.0156 39.816c0.42969 14.254 2.8203 26.82 2.6328 41.691-0.17578 14.133-1.2773 29.664-0.69531 43.609 0.64062 15.234 4.9922 24.57-2.9414 36.367-40.469-7.4531-85.125-4.3672-125.7-0.83594-2.8555 0.25391-6.1055 0.5625-8.7656-0.26562l-3.7148-2.1836c-4.7734-2.8984-8.5312 0.61719-13.637 0.30859-5.875-0.35156-1.0156-1.7188-10.383-0.27734-4.6289 0.71484-7.6953 0.88281-12.723 0.66016-19.059-0.87109-13.031 4.3984-16.68 45.879-1.3672 15.445 0.066406 37.359-1.9844 51.16-9.5117 2.5703-8.2461 1.168-15.191-3.9336-9.6445-7.0781-18.242-10.449-27.406-18.102l-73.406-46.012c-6.3594-3.5508-14.211-7.1875-19.488-10.914-22.641-15.953-48.855-30.855-70.715-48.637l-53.18-37.801c-13.582-7.8828-24.176-18.199-38.957-21.629 0.089844-12.512 17.406-17.594 32.52-23.535 7.375-2.8984 12.766-6.0742 19.059-9.4805 6.6484-3.6055 12.422-5.9102 18.938-9.5234 23.426-13.008 46.609-29.465 69.305-42.684 35.453-20.648 70.75-42.672 106.77-61.742l25.773-15.984c5.918-4.6836 2.5898-4.4219 11.961-2.1484 0.10937 11.863-0.12109 8.1797-7.9258 11.805-25.586 11.871-121.28 70.859-148.54 86.414-9.2383 5.2695-19.07 10.055-28.09 15.598-10.121 6.2188-16.445 12.293-27.152 16.758l4.3203 15.332c2.2617-5.7891 8.6992-10.129 13.844-14.453 6.4805-5.4336 9.3906-10.738 17.848-10.383 2.0273 4.6523 0.57422 6.625-0.52734 11.266 7.4062-2.8867 12.215-8.9727 17.176-13.789l31.934-28.672c5.9297-5.8984 10.406-11.168 19.699-10.836 3.3086 11.113-7.7266 17.219-14.34 25.676-6.1523 7.8828-17.625 19.809-19.469 24.836 15.289-11.574 43.445-37.855 55.957-56.738 3.3398-5.0273 2.2266-5.9297 6.2383-9.9414 6.4805 2.0273 4.6172 0.98047 7.6289 6.7812-2.9219 6.7578-1.5547 3.1211-5.918 7.418-11.598 11.398-48.406 60.918-66.316 79.59l-21.078 24.254c-3.3633 3.8125-0.011719-0.81641-3.1289 3.9688 4.6953-4.7852 1.125-4.75 7.2305-2.3828l-16.887 14.277c-1.8398 1.9961-5.4688 5.3789-7.7148 7.3984l-8.3242 10.316c11.938 5.0703 115.97 80.539 135.4 85.324 8.0586-8.0039 18.133-26.875 26.699-31.207z"
          fillRule="evenodd"
        />
        <path
          d="m360 380.32c1.6328-6.4609 45.562-62.164 55.812-78.398l7.8828-12.488c-3.9258 2.2031-9.8984 7.9688-12.699 11.234l-38.648 41.105c-4.1211 4.3008-7.9688 7.7266-12.609 11.973-9.2617 8.457-35.211 36.09-42.277 34.746-3.5039-8.8281 23.238-36.465 29.953-45.086 7.7148-9.8984 51.457-70.254 53.871-76.977-5.7656 2.5898-4.4883 3.2852-11.961 10.859l-23.613 23.758c-10.152 9.3164-2.1719 7.9141-13.789 11.992 2.5586-5.4023-0.13281-1.5547 3.2969-5.5352 0.49609-0.57422 3.9336-3.6172 4.8398-4.5078l44.832-49.969c4.4883-5.2266 11.555-18.488 17.746-17.055 0.40625 1.0039 5.0391-1.3789-1.3125 8.7734l-43.621 62.68c-8.5977 11.375-46.52 59.297-49.418 68.855 13.02-6.2852 21.34-16.988 31.074-26.633 26.82-26.566 48.734-49 71.664-80 4.9492-6.7031 7.0312-13.051 15.875-14.715 1.5547 6.9883-1.6094 10.086-6.2617 16.789l-44.867 63.211c-4.8828 6.6016-30.879 42.949-35.773 45.395z"
          fillRule="evenodd"
        />
        <path
          d="m255.43 293.22c3.7031 5.6211 0.10937 2.2266 3.7461 3.7812l-18.234 19.523c-7.4648 7.4062-14 18.453-19.832 16.723-3.3164-8.332 4.4648-10.461 15.719-24.691l31.188-33.191c5.0469-5.4805 5.0156-7.7383 9.5703-13.219 4.1016-4.9258 16.457-16.172 19.789-26.016-7.2188 3.6484-0.68359 1.8633-8.4453 3.9141l19.523-15.5c4.3438-9.0742 18.453-23.48 25.707-30.941 4.1016-4.1992 5.5234-7.2188 9.5039-11.344l33.676-41.789c8.332-1.8398 7.7617 8.8086-6.0625 22.047-17.914 17.164-20.492 21.363-34.328 37.699-16.383 19.348-33.984 37.602-49.727 58.348-20.867 27.535-5.918 11.73-13.426 22.828-1.2773 1.8945-2.1484 2.1367-3.8594 2.7227l-3.2617 0.36328c-5.543 1.9727-4.6172 6.8789-11.242 8.7422z"
          fillRule="evenodd"
        />
        <path
          d="m233.52 289.28 2.3828-2.1953c8.875-8.125 8.9844-12.48 16.922-12.18-4.375 5.7773-3.8477 2.0508-8.8516 6.5352-6.7461 6.0508 0.21875 5.0586-10.449 7.8359z"
          fillRule="evenodd"
        />
        <path
          d="m529.72 240.82c4.0352-3.5156 3.8047-3.793 5.3672-9.3047l-1.4766 6.3828c-3.7578 5.1367-1.1562 1.6641-3.8906 2.9219z"
          fillRule="evenodd"
        />
        {/* <use x="70" y="560.164063"/>
        <use x="70.039062" y="560.164063"  />
        <use x="70.066406" y="560.164063" />
        <use x="70.105469" y="560.164063" xlink:href="#e" />
        <use x="70.140625" y="560.164063" xlink:href="#c" />
        <use x="70.167969" y="560.164063" xlink:href="#a" />
        <use x="70.207031" y="560.164063" xlink:href="#k" />
        <use x="70.265625" y="560.164063" xlink:href="#j" />
        <use x="70.304688" y="560.164063" xlink:href="#i" />
        <use x="70.359375" y="560.164063" xlink:href="#h" />
        <use x="70.402344" y="560.164063" xlink:href="#v" />
        <use x="70.421875" y="560.164063" xlink:href="#a" />
        <use x="70.457031" y="560.164063" xlink:href="#u" />
        <use x="70.511719" y="560.164063" xlink:href="#t" />
        <use x="70.566406" y="560.164063" xlink:href="#g" />
        <use x="70.605469" y="560.164063" xlink:href="#b" />
        <use x="70.632812" y="560.164063" xlink:href="#e" />
        <use x="70.671875" y="560.164063" xlink:href="#f" />
        <use x="70.707031" y="560.164063" xlink:href="#a" />
        <use x="70.746094" y="560.164063" xlink:href="#f" />
        <use x="70" y="560.21875" xlink:href="#s" />
        <use x="70.023438" y="560.21875" xlink:href="#b" />
        <use x="70.050781" y="560.21875" xlink:href="#d" />
        <use x="70.089844" y="560.21875" xlink:href="#r" />
        <use x="70.164063" y="560.21875" xlink:href="#c" />
        <use x="70.191406" y="560.21875" xlink:href="#q" />
        <use x="70.230469" y="560.21875" xlink:href="#a" />
        <use x="70.289062" y="560.21875" xlink:href="#p" />
        <use x="70.332031" y="560.21875" xlink:href="#d" />
        <use x="70.371094" y="560.21875" xlink:href="#g" />
        <use x="70.410156" y="560.21875" xlink:href="#o" />
        <use x="70.46875" y="560.21875" xlink:href="#n" />
        <use x="70.511719" y="560.21875" xlink:href="#b" />
        <use x="70.535156" y="560.21875" xlink:href="#d" />
        <use x="70.574219" y="560.21875" xlink:href="#m" />
        <use x="70.59375" y="560.21875" xlink:href="#a" />
        <use x="70.632812" y="560.21875" xlink:href="#l" />
        <use x="70.664062" y="560.21875" xlink:href="#c" /> */}
      </g>
    </svg>
  );
}
