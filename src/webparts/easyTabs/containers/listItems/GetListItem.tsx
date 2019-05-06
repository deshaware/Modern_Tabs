import * as React from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";

import Shimmers from "../../components/common/Shimmers";
import PivotItemComponent from "../../components/PivotItemComponent";
import { IPivotItemProps, IListItem } from "../IListItemProps";
import { connect } from "react-redux";
import { getListItems } from "../../actions/listItems/listItems";
import { SPHttpClient } from "@microsoft/sp-http";
import { escape, isEmpty } from "@microsoft/sp-lodash-subset";

export interface IListItems {
  listGUID: string;
  getListItems: (
    siteUrl: string,
    listGUID: string,
    spHttpClient: SPHttpClient
  ) => {};
  siteContext: IContext;
  listItems: any;
}
export interface IContext {
  spHttpClient: SPHttpClient;
  siteURL: string;
}

class GetListItem extends React.Component<IListItems, {}> {
  constructor(p: any) {
    super(p);
    // this.props.listGUID = "9d36c26c-e0cd-4c6b-ae40-8ffa505a8e69";
  }
  public componentDidMount() {
    // debugger;
  }
  public seeListItems() {
    console.log(
      "%c MyApp:",
      "background:green;color:white",
      "ListItemsRenders"
    );
    console.log(
      "%c MyApp:",
      "background:red;color:white",
      this.props.listItems
    );
    if (isEmpty(this.props.siteContext)) {
      debugger;
      this.props.getListItems(
        this.props.siteContext.siteURL,
        // this.props.listGUID,
        "9d36c26c-e0cd-4c6b-ae40-8ffa505a8e69",
        this.props.siteContext.spHttpClient
      );
    }
  }

  public render(): JSX.Element {
    this.seeListItems();
    return <div />;
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  // debugger;
  return {
    siteContext: state.currentContext.siteContext,
    listItems: state.listItems
  };
};

export default connect(
  mapStateToProps,
  { getListItems }
)(GetListItem);
