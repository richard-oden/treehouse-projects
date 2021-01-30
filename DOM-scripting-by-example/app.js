document. addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');
  
  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if (isChecked) {
      for (const li of lis) {
        if (li.className !== 'responded') {
          li.style.display = 'none';
        } else {
          li.querySelector('label').style.display = 'none';
        }
      }
    } else {
      for (const li of lis) {
        if (li.className !== 'responded') {
          li.style.display = '';
        } else {
          li.querySelector('label').style.display = '';
        }
      }
    }
  });
  
  
  function createLI(text) {
    
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text.length) {
      input.value = '';
      const li = createLI(text);
      ul.appendChild(li);
    } else {
      alert('You must enter a name before submitting.');
    }
  });
  
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    const labelText = checkbox.parentNode.childNodes[0];
    
    if (checked) {
      listItem.className = 'responded';
      labelText.nodeValue = 'Confirmed';
    } else {
      listItem.className = '';
      labelText.nodeValue = 'Confirm';
    }
  });
  
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';
        }
      };
      // select and run action button's name:
      nameActions[button.textContent]();
    }
    
  });
});