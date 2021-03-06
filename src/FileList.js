import React, { Component } from "react";
import Heading from "@instructure/ui-elements/lib/components/Heading";
import ScreenReaderContent from "@instructure/ui-a11y/lib/components/ScreenReaderContent";
import FileListItem from "./FileListItem";
import { Trans } from "@lingui/macro";
import Paginate from "./Paginate";

export default class FileList extends Component {
  render() {
    const fileResources = this.props.resources
      .filter(node => node.querySelector("file"))
      .map(node => ({
        href: node.querySelector("file").getAttribute("href"),
        identifier: node.getAttribute("identifier"),
        metadata: node.querySelector("metadata")
      }))
      .filter(({ href }) => {
        return href.startsWith("wiki_content/") === false;
      });

    const listItems = fileResources.map(
      ({ dependencyHrefs, href, identifier, metadata }, index) => {
        return (
          <FileListItem
            dependencyHrefs={dependencyHrefs}
            href={`/${href}`}
            identifier={identifier}
            key={index}
            src={this.props.src}
            metadata={metadata}
          />
        );
      }
    );

    return (
      <div className="Cartridge-content-inner">
        <Heading level="h1">
          <ScreenReaderContent>
            <Trans>Files</Trans>
          </ScreenReaderContent>
        </Heading>
        <Paginate
          listItems={listItems}
          location={this.props.location}
          classNames="Files"
        />
      </div>
    );
  }
}
