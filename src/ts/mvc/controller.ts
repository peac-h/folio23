import Model from "./model";
import view from "./view";

class Controller {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public init(): void {
    view.changeTitles();
    view.renderOverlay();
    view.initializePage();
    this.model.loadData();
    view.renderData(this.model.getData());
    view.handleNavClicks();
  }
}

const model = new Model();
export default new Controller(model);
