import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import bowtie from "./bowtie";

var pattern = new freesewing.Pattern({ version: version, ...config })
	.with( pluginBundle );

pattern.draft = function() {
  if(this.needs(['bowtie'])) this.parts.bowtie = this.draftBowtie( new pattern.Part() );

  return pattern;
};

pattern.draftBowtie = part => bowtie.draft( part );

export default pattern;
