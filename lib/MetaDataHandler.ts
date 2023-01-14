export class MetaDataHandler {
  metadata: any;
  setMetadata: Function;

  constructor(metadata: any, setMetadata: Function) {
    this.metadata = metadata;
    this.setMetadata = setMetadata;
  }
}
