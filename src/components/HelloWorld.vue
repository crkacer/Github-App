<template>
  <v-card
    color="blue-grey darken-1"
    dark
  >
    <v-img
      height="200"
      src="assets/github.gif"
    >
      <v-layout wrap>
        <v-flex xs12>
          <v-progress-linear
            :active="isUpdating"
            class="ma-0"
            color="green lighten-3"
            height="4"
            indeterminate
          ></v-progress-linear>
        </v-flex>
        <v-flex
          text-xs-right
          xs12
        >
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile @click="isUpdating = true">
                <v-list-tile-action>
                  <v-icon>mdi-settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Update</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
        <v-layout
          align-start
          column
          justify-end
          pa-3
        >
          <h3 class="headline">{{ name }}</h3>
          <span class="grey--text text--lighten-1">{{ title }}</span>
        </v-layout>
      </v-layout>
    </v-img>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="search"
              :disabled="isUpdating"
              box
              color="blue-grey lighten-2"
              label="Search"
              @change="handleOnChange"
            ></v-text-field>
          </v-flex>
          
          <v-flex xs12>
            <v-autocomplete
              v-model="languages"
              :disabled="isUpdating"
              :items="people"
              box
              chips
              color="blue-grey lighten-2"
              label="Languages"
              item-text="name"
              item-value="name"
              multiple
              @change="handleOnChange"
            >
              <template v-slot:selection="data">
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.avatar">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img :src="data.item.avatar">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
          </v-flex>

          <v-flex xs12 >

          <v-card>
            <v-card-actions>
              <v-toolbar-title>Title</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-card-actions>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
            <v-card 
            v-for="(repo, key) in repos"
            color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs5>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{repo.name}}</div>
                      <div>Foster the People</div>
                      <div>(2014)</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                {{ repo.stargazers_count}}
                <v-spacer></v-spacer>
                <v-icon>star</v-icon>
              </v-card-actions>
            </v-card>
          </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        </v-layout>
      </v-container>
    </v-form>
    <v-divider></v-divider>
  </v-card>
</template>


<script>
import GithubService from "@/services/github";
export default {
    data () {
      const srcs = {
        1: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Badge_js-strict.svg',
        2: 'https://cdn.vox-cdn.com/assets/1087137/java_logo_640.jpg',
        3: 'https://cdn.instructables.com/FRN/GME6/IXQFY5HZ/FRNGME6IXQFY5HZ.LARGE.jpg',
        4: 'https://www.abouthack.com/wp-content/uploads/2014/07/css3_logo.png',
        5: 'https://www.php.net/images/logos/new-php-logo.png',
        6: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/sRglYNs-796x398.jpg',
        7: 'https://www.sjpl.org/sites/default/files/styles/large/public/events/images/2019/01/c.png?itok=NU4RcK4w',
        8: 'https://visualpharm.com/assets/698/C%20Programming-595b40b65ba036ed117d3edc.svg',
        9: 'https://www.fullstackpython.com/img/logos/powershell.png',
        10: 'https://camo.githubusercontent.com/0617f4657fef12e8d16db45b8d73def73144b09f/68747470733a2f2f646576656c6f7065722e6665646f726170726f6a6563742e6f72672f7374617469632f6c6f676f2f6373686172702e706e67',
        11: 'https://www.assignmenthelp.net/images/obj-c.jpg',
        12: 'http://mercury.webster.edu/aleshunas/R_learning_infrastructure/images/R.png',
        13: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Vimlogo.svg',
        14: 'https://sdtimes.com/wp-content/uploads/2018/02/golang.sh_-490x490.png',
        15: 'https://cdn.worldvectorlogo.com/logos/perl-programming-language.svg',
        16: 'http://videotutorialspoint.com/wp-content/uploads/2016/04/coffeescript.png',
        17: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/TeX_logo.svg/2880px-TeX_logo.svg.png',
        18: 'https://i1.wp.com/www.snyxius.com/wp-content/uploads/2015/06/swift-language-logo.jpg?ssl=1',
        19: 'https://upload.wikimedia.org/wikipedia/en/8/85/Scala_logo.png',
        20: 'http://ergoemacs.org/emacs/lisp_logo/LISP_logo_big.png',
        21: 'https://steemitimages.com/DQmcPT7mmj2xC7kqeuVEUbPyqLBQCGmN1fSq146FzZZfsNq/haskell-logo.png',
        22: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lua-logo-nolabel.svg/1920px-Lua-logo-nolabel.svg.png',
        23: 'http://neuroplausible.com/img/posts/matlab.jpg',
        24: 'https://cdn-learn.adafruit.com/assets/assets/000/047/242/original/circuit_playground_Arduino_logo_teal.png',
        25: 'https://opensource.com/sites/default/files/styles/image-full-size/public/lead-images/osdc_liberate%20docs_1109ay.png',
        26: 'https://www.i-programmer.info/images/stories/News/2015/Jan/B/groovylogo.jpg',
        27: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Puppet_Logo.svg',
        28: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1920px-Rust_programming_language_black_logo.svg.png',
        29: 'https://www.supinfo.com/articles/resources/218598/6058/7.png',
        30: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin-logo.svg/220px-Kotlin-logo.svg.png'
      }

      return {
        autoUpdate: true,
        languages: [],
        isUpdating: false,
        name: '',
        people: [
          { name: 'Javascript', avatar: srcs[1] },
          { name: 'Java ', avatar: srcs[2] },
          { name: 'Python', avatar: srcs[3] },
          { name: 'CSS', avatar: srcs[4] },
          { name: 'PHP', avatar: srcs[5] },
          { name: 'Ruby', avatar: srcs[6] },
          { name: 'C++', avatar: srcs[7] },
          { name: 'C', avatar: srcs[8] },
          { name: 'Shell', avatar: srcs[9] },
          { name: 'C#', avatar: srcs[10] },
          { name: 'Objective C', avatar: srcs[11] },
          { name: 'R', avatar: srcs[12] },
          { name: 'Vim', avatar: srcs[13] },
          { name: 'Go', avatar: srcs[14] },
          { name: 'Perl', avatar: srcs[15] },
          { name: 'Coffee Script', avatar: srcs[16] },
          { name: 'Tex', avatar: srcs[17] },
          { name: 'Swift', avatar: srcs[18] },
          { name: 'Scala', avatar: srcs[19] },
          { name: 'Lisp', avatar: srcs[20] },
          { name: 'Haskell', avatar: srcs[21] },
          { name: 'Lua', avatar: srcs[22] },
          { name: 'Matlab', avatar: srcs[23] },
          { name: 'Arduino', avatar: srcs[24] },
          { name: 'Makefile', avatar: srcs[25] },
          { name: 'Groovy', avatar: srcs[26] },
          { name: 'Puppet', avatar: srcs[27] },
          { name: 'Rust', avatar: srcs[28] },
          { name: 'SQL', avatar: srcs[29] },
          { name: 'Kotlin', avatar: srcs[30] },

        ],
        title: '',
        repos: [],
        search: ''
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      }
    },

    methods: {
      remove (item) {
        const index = this.languages.indexOf(item.name)
        if (index >= 0) this.languages.splice(index, 1)
      },
      handleOnChange() {
        console.log(this.languages);
        
        if (this.search !== '' && this.languages.length > 0) {
          const query = {
            q: 'a',
            langs: this.languages.join(','),
            sort: 'stars',
            order: 'desc'
          };
          setTimeout(() => {
          GithubService.searchByLanguages(query)
            .then((res) => {
              console.log(res);
              this.repos = res.data.items;
            })
            .catch((err) => {
              console.log(err);
            });
          }, 500);
        }
      }
    }
  }
</script>

<style>

</style>
