class View {
  constructor(opts) {
    this.afterRender = opts.afterRender;
  }

  renderTemplate(name, data) {
    let template = require(`../../src/templates/${name}.hdbs`);
    return template(data);
  }

  switchTo(name, data) {
    document.querySelector('[data-main]').innerHTML = this.renderTemplate(name, data);
    typeof this.afterRender === 'function' && this.afterRender();
  }
}

export default View;
