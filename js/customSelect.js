function isMobileDevice() {
  return (
    typeof window.orientation !== 'undefined'
    || navigator.userAgent.indexOf('IEMobile') !== -1
  );
}

function crearSelect() {
  const li = [];
  const divContSelect = document.querySelectorAll(
    "[data-mate-select='active']",
  );
  let select = '';
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let e = 0; e < divContSelect.length; e++) {
    divContSelect[e].setAttribute('data-indx-select', e);
    divContSelect[e].setAttribute('data-selec-open', 'false');
    const ulCount = document.querySelectorAll(`[data-indx-select='${e}'] > .cont_list_select_mate > ul`);
    /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
    select = document.querySelectorAll(`[data-indx-select='${e}'] >select`)[0];
    if (isMobileDevice()) {
      // eslint-disable-next-line no-loop-func
      select.addEventListener('change', () => {
        /* eslint no-use-before-define: ["error", { "functions": false }] */
        selectOption(select.selectedIndex, e);
      });
    }
    const selectOptions = select.options;
    document.querySelectorAll(`[data-indx-select='${e}']  > .select__option `)[0].setAttribute('data-n-select', e);
    document.querySelectorAll(`[data-indx-select='${e}']  > .icon_select_mate `)[0].setAttribute('data-n-select', e);
    for (let i = 0; i < selectOptions.length; i++) {
      li[i] = document.createElement('li');
      if (selectOptions[i].selected === true || select.value === selectOptions[i].innerHTML) {
        li[i].className = 'active';
        document.querySelector(`[data-indx-select='${e}']  > .select__option `).innerHTML = selectOptions[i].innerHTML;
      }
      li[i].setAttribute('data-index', i);
      li[i].setAttribute('data-selec-index', e);
      li[i].setAttribute('id', 'js-option');
      /* eslint func-names: ["error", "never"] */
      li[i].addEventListener('click', function () {
        selectOption(
          this.getAttribute('data-index'),
          this.getAttribute('data-selec-index'),
        );
      });
      li[i].innerHTML = selectOptions[i].innerHTML;
      ulCount[0].appendChild(li[i]);
    }
  }
}

// eslint-disable-next-line no-unused-vars
function openSelect(idx) {
  const idx1 = idx.getAttribute('data-n-select');
  const ulContLi = document.querySelectorAll(`[data-indx-select='${idx1}'] .cont_select_int > li`);
  let hg = 0;
  const slectOpen = document.querySelectorAll(`[data-indx-select='${idx1}']`)[0].getAttribute('data-selec-open');
  const slectElementOpen = document.querySelectorAll(`[data-indx-select='${idx1}'] select`)[0];
  if (isMobileDevice()) {
    if (window.document.createEvent) {
      const evt = window.document.createEvent('MouseEvents');
      evt.initMouseEvent('mousedown', false, true, window, 0, 0, 0, 0, 0, false, false, false, 0, null);
      slectElementOpen.dispatchEvent(evt);
    } else if (slectElementOpen.fireEvent) {
      slectElementOpen.fireEvent('onmousedown');
    } else {
      slectElementOpen.click();
    }
  } else {
    for (let i = 0; i < ulContLi.length; i++) {
      hg += ulContLi[i].offsetHeight;
    }
    if (slectOpen === 'false') {
      document.querySelectorAll(`[data-indx-select='${idx1}']`)[0].setAttribute('data-selec-open', 'true');
      document.querySelectorAll(`[data-indx-select='${idx1}'] > .cont_list_select_mate > ul`)[0].style.height = `${hg}px`;
      document.querySelectorAll(`[data-indx-select='${idx1}'] > .icon_select_mate`)[0].style.transform = 'rotate(0deg)';
    } else {
      document.querySelectorAll(`[data-indx-select='${idx1}']`)[0].setAttribute('data-selec-open', 'false');
      document.querySelectorAll(`[data-indx-select='${idx1}'] > .icon_select_mate`)[0].style.transform = 'rotate(180deg)';
      document.querySelectorAll(`[data-indx-select='${idx1}'] > .cont_list_select_mate > ul`)[0].style.height = '0px';
    }
  }
}

function salirSelect(indx) {
  document.querySelectorAll(`[data-indx-select='${indx}'] > .cont_list_select_mate > ul`)[0].style.height = '0px';
  document.querySelector(`[data-indx-select='${indx}'] > .icon_select_mate`).style.transform = 'rotate(180deg)';
  document.querySelectorAll(`[data-indx-select='${indx}']`)[0].setAttribute('data-selec-open', 'false');
}

function selectOption(indx, selc) {
  let selc2 = selc;
  if (isMobileDevice()) {
    selc2 -= 1;
  }
  const select = document.querySelectorAll(`[data-indx-select='${selc2}'] > select`)[0];
  const liS = document.querySelectorAll(`[data-indx-select='${selc2}'] .cont_select_int > li`);
  document.querySelectorAll(`[data-indx-select='${selc2}'] > .select__option`)[0].innerHTML = liS[indx].innerHTML;
  const selectOptions = document.querySelectorAll(`[data-indx-select='${selc2}'] > select > option`);
  for (let i = 0; i < liS.length; i++) {
    if (liS[i].className === 'active') {
      liS[i].className = '';
    }
    liS[indx].className = 'active';
  }
  selectOptions[indx].selected = true;
  select.selectedIndex = indx;
  select.onchange();
  salirSelect(selc2);
}

crearSelect();
